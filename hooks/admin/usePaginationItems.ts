import { db } from "@/lib/db";

interface PaginatedItemsParams<TWhereInput> {
  model: any;
  searchParams: { [key: string]: string | undefined };
  itemsPerPage: number;
  searchField?: keyof TWhereInput;
  searchFields?: (keyof TWhereInput)[];
  orderByField?: keyof TWhereInput;
}

export const getPaginatedItems = async <TWhereInput>({
  model,
  searchParams,
  itemsPerPage,
  searchField,
  searchFields,
  orderByField,
}: PaginatedItemsParams<TWhereInput>) => {
  const { page, ...queryParams } = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const query: any = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "search":
          if (searchFields && searchFields.length > 0) {
            query.OR = searchFields.map((field) => ({
              [field]: { contains: value, mode: "insensitive" },
            }));
          } else if (searchField) {
            query[searchField] = { contains: value, mode: "insensitive" };
          }
          break;
        default:
          break;
      }
    }
  }


  const orderBy = orderByField
    ? {
        [orderByField]: "desc",
      }
    : undefined;

  const [data, count] = await db.$transaction([
    model.findMany({
      where: query,
      orderBy,
      take: itemsPerPage,
      skip: itemsPerPage * (currentPage - 1),
    }),
    model.count({ where: query }),
  ]);

  return {
    data,
    count,
    currentPage,
  };
};

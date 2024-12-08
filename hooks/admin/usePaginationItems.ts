import { db } from "@/lib/db";

interface PaginatedItemsParams<TWhereInput> {
  model: any;
  searchParams: { [key: string]: string | undefined };
  itemsPerPage: number;
  searchField: keyof TWhereInput;
  orderByField?: keyof TWhereInput;
}

export const getPaginatedItems = async <TWhereInput>({
  model,
  searchParams,
  itemsPerPage,
  searchField,
  orderByField,
}: PaginatedItemsParams<TWhereInput>) => {
  const { page, ...queryParams } = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const query: TWhereInput = {} as TWhereInput;

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "search":
          (query[searchField] as any) = { contains: value, mode: "insensitive" };
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

import FormModal from "@/components/Admin/Modals/FormModal";
import Pagination from "@/components/UI/Admin/Pagination";
import Table from "@/components/UI/Admin/Table";
import TableSearch from "@/components/UI/Admin/TableSearch";
import { getPaginatedItems } from "@/hooks/admin/usePaginationItems";
import { db } from "@/lib/db";
import { Post, User } from "@/types/types";
import { Prisma } from "@prisma/client";

const PostListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const ITEM_PER_PAGE = 4;
  const params = await searchParams;

  const { data, count, currentPage } =
    await getPaginatedItems<Prisma.PostWhereInput>({
      model: db.post,
      searchParams: params,
      itemsPerPage: ITEM_PER_PAGE,
      searchField: "title",
    });

  const columns = [
    {
      header: "Titre",
      accessor: "titre",
    },
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Auteur",
      accessor: "auteur",
    },
    {
      header: "Actions",
      accessor: "action",
      className: "table-column table-column--actions",
    },
  ];

  const renderRow = (item: Post) => (
    <tr key={item.id} className="table-row">
      <td className="table-row__cell table-row__cell--address">
        {item?.title}
      </td>
      <td className="table-row__cell table-row__cell--address">
        {item?.summary}
      </td>
      <td className="table-row__cell table-row__cell--address">
        {item?.author}
      </td>
      <td>
        <div className="table-row__actions">
          <FormModal table="post" type="update" data={item} />
          <FormModal table="post" type="delete" data={item} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="card">
      {/* TOP */}
      <div className="card__header">
        <h1 className="card__header__title">Articles</h1>
        <div className="card__header__controls">
          <TableSearch />
          <div className="card__header__actions">
            <FormModal table="post" type="create" />
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={currentPage} count={count} />
    </div>
  );
};

export default PostListPage;

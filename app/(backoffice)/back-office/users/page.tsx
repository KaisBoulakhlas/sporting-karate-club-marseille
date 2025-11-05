import FormModal from "@/components/Admin/Modals/FormModal";
import Pagination from "@/components/UI/Admin/Pagination";
import Table from "@/components/UI/Admin/Table";
import TableSearch from "@/components/UI/Admin/TableSearch";
import { getPaginatedItems } from "@/hooks/admin/usePaginationItems";
import { db } from "@/lib/db";
import { User } from "@/types/types";
import { Prisma } from "@prisma/client";
import Image from "next/image";

export const dynamic = "force-dynamic";

const UserListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const ITEM_PER_PAGE = 4;

  const { data, count, currentPage } =
    await getPaginatedItems<Prisma.UserWhereInput>({
      model: db.user,
      searchParams,
      itemsPerPage: ITEM_PER_PAGE,
      searchField: "name",
    });

  const columns = [
    {
      header: "Image",
      accessor: "Image",
    },
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Rôle",
      accessor: "role",
      className: "table-column table-column--phone",
    },
    {
      header: "Actions",
      accessor: "action",
      className: "table-column table-column--actions",
    },
  ];

  const renderRow = (item: User) => (
    <tr key={item.id} className="table-row">
      <td>
        <Image
          src={item.image || "/images/avatar.png"}
          alt=""
          width={40}
          height={40}
          className="table-row__image"
        />
      </td>
      <td className="table-row__cell table-row__cell--info">
        <div className="table-row__cell--name">
          {item.firstName} {item.name}
        </div>
        <p className="table-row__cell--email">{item?.email}</p>
      </td>
      <td className="table-row__cell table-row__cell--address">{item?.role}</td>
      <td>
        <div className="table-row__actions">
          <FormModal table="user" type="update" data={item} />
          <FormModal table="user" type="delete" data={item} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="card">
      {/* TOP */}
      <div className="card__header">
        <h1 className="card__header__title">Utilisateurs</h1>
        <div className="card__header__controls">
          <TableSearch />
          <div className="card__header__actions">
            <FormModal table="user" type="create" />
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

export default UserListPage;

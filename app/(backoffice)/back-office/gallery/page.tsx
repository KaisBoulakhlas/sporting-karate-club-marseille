import FormModal from "@/components/Admin/Modals/FormModal";
import Pagination from "@/components/UI/Admin/Pagination";
import Table from "@/components/UI/Admin/Table";
import TableSearch from "@/components/UI/Admin/TableSearch";
import { getPaginatedItems } from "@/hooks/admin/usePaginationItems";
import { db } from "@/lib/db";
import { GalleryItemProps, Post, User } from "@/types/types";
import { Prisma } from "@prisma/client";
import Image from "next/image";

const GalleryListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const ITEM_PER_PAGE = 4;

  const { data, count, currentPage } =
    await getPaginatedItems<Prisma.GalleryItemWhereInput>({
      model: db.galleryItem,
      searchParams,
      itemsPerPage: ITEM_PER_PAGE,
      searchField: "title",
    });

  const columns = [
    {
      header: "Titre",
      accessor: "title",
    },
    {
      header: "Image",
      accessor: "image",
    },
    {
      header: "Type",
      accessor: "type",
    },
    {
      header: "Actions",
      accessor: "action",
      className: "table-column table-column--actions",
    },
  ];

  const renderRow = (item: GalleryItemProps) => (
    <tr key={item.id} className="table-row">
      <td className="table-row__cell table-row__cell--address">
        {item?.title}
      </td>
      <td className="table-row__cell table-row__cell--address">
        {item.type === "image" ? (
          <Image
            src={item?.src}
            alt={item?.title || "Une image"}
            width={80}
            height={80}
          />
        ) : (
          <video src={item?.src} width={80} height={80} loop autoPlay muted>
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        )}
      </td>
      <td className="table-row__cell table-row__cell--address">{item?.type}</td>
      <td>
        <div className="table-row__actions">
          <FormModal table="gallery" type="delete" data={item} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="card">
      {/* TOP */}
      <div className="card__header">
        <h1 className="card__header__title">Gallerie</h1>
        <div className="card__header__controls">
          <TableSearch />
          <div className="card__header__actions">
            <FormModal table="gallery" type="create" />
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

export default GalleryListPage;

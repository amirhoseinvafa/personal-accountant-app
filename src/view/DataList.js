import React from "react";
import { Table, Button } from "reactstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsX } from "react-icons/bs";

const DataList = (props) => {
  return (
    <>
      <Table hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>عنوان</th>
            <th>مبلغ</th>
            <th>دسته بندی</th>
            <th>نوع</th>
            <th>تاریخ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, index) => (
            <tr
              key={item.id}
              className={
                item.type === "income" ? "background-income" : "background-cost"
              }
              style={item.editMode ? { backgroundColor: "#ffff0086" } : null}
            >
              <th scope="row">{index + 1}</th>
              <td>{item.title}</td>
              <td>{String(item.price).replace(/(.)(?=(\d{3})+$)/g, "$1,")}</td>
              <td>{item.category}</td>
              {/* <td>{item.type === "income" ? "درآمد" : "هزینه"}</td> */}
              <td>{item.date}</td>
              <td>
                <Button
                  className="ml-2"
                  color={item.editMode ? "warning" : "secondary"}
                  size="sm"
                  onClick={() => props.editMode(item.id)}
                  title="Edit"
                >
                  <FaEdit />
                </Button>
                {!item.editMode ? (
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => props.removeItem(item.id)}
                    title="!Delete"
                  >
                    <FaTrash size=".8rem" />
                  </Button>
                ) : (
                  <Button
                    color="info"
                    size="sm"
                    title="!Cancel"
                    onClick={() => props.closeEditMode(item.id)}
                  >
                    <BsX />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default DataList;

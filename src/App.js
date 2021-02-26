import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

import "./App.css";
import DataInput from "./view/DataInput";
import DataList from "./view/DataList";
import { initialItems } from "./inital-data/initalData";
import Filters from "./view/Filters";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [items, setItems] = useState([...initialItems]);
  const [price, setPrice] = useState();
  const [user, setUser] = useState();
  const [editing, setEditing] = useState();
  const divScroll = useRef(null);

  useEffect(() => {
    divScroll.current.scrollIntoView({ behavior: "smooth" });
  }, [editing]);

  const onSaved = (data, e) => {
    let dateNow = new Date().toLocaleDateString("fa-IR");

    if (data.id !== "") {
      //Edit selected item

      const temp = [...items];
      const index = temp.findIndex((q) => q.id === data.id);

      temp[index] = data;
      temp[index].date = dateNow;
      setItems([...temp]);
    } else {
      //Add new item

      const newItem = {
        ...data,
        id: uuidv4(),
        date: dateNow,
      };
      setItems([...items, newItem]);
    }
    e.target.reset();

    //toastr fuction
    notify();
  };
  const notify = () =>
    toast.info("تغییرات ذخیره شد", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const handleChangePrice = (data) => setPrice(data.target.value);
  const handleChangeUser = (data) => setUser(data.target.value);

  // const filterByType = items.filter((i) => i.type.indexOf(price) >= 0);
  const filterByUserName = items.filter((i) => i.category.indexOf(user) >= 0);

  const setEditMode = (id) => {
    const temp = [...items];
    const index = temp.findIndex((q) => q.id === id);
    temp.forEach((q) => (q.editMode = false));
    temp[index].editMode = true;
    setItems([...temp]);
    setEditing(id);
  };

  const setCloseEditMode = (id) => {
    const temp = [...items];
    const index = temp.findIndex((q) => q.id === id);
    temp[index].editMode = false;
    setItems([...temp]);
  };

  const setRemoveItem = (id) => {
    swal({
      title: "آیتم حذف شود؟",
      text: "توجه!!! در صورت حذف کردن قابل بازیابی نمیباشد.",
      icon: "warning",
      dangerMode: true,
      buttons: ["انصراف", "حذف"],
    }).then((willDelete) => {
      if (willDelete) {
        setItems(items.filter((q) => q.id !== id));

        const temp = [...items];
        const index = temp.findIndex((q) => q.id === id);
        toast.error(`آیتم از دسته بندی  ${temp[index].category} حذف شد`, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  };

  return (
    <>
      <header className="header">
        <h1> حسابدار شخصی</h1>
      </header>
      <div ref={divScroll} />

      <div className=" row mx-2 mt-4">
        <ToastContainer rtl />
        <div className="form-container col-md-4">
          <DataInput
            onSaved={onSaved}
            editItem={items.find((q) => q.editMode === true)}
          />
          <Filters
            handleChangePrice={handleChangePrice}
            handleChangeUser={handleChangeUser}
            price={price}
            user={user}
          />
        </div>

        <div className="mb-5 col-md-8">
          <DataList
            items={filterByUserName.length === 0 ? items : filterByUserName}
            editMode={setEditMode}
            removeItem={setRemoveItem}
            closeEditMode={setCloseEditMode}
          />
          {/* filterByType.length === 0 ? items : filterByType */}
        </div>
      </div>
    </>
  );
}

export default App;

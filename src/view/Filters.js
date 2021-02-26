import { FormGroup, Form, Input, Row, Col } from "reactstrap";

import { users } from "../inital-data/initalData";

const Filters = ({ handleChangePrice, price, handleChangeUser, user }) => {
  return (
    <>
      <div className="mt-5">
        <h5 className="text-right mb-2">فیلتر بر اساس : </h5>
        <Form>
          <Row>
            <FormGroup>
              <Input
                type="select"
                name="category"
                bsSize="sm"
                onChange={handleChangeUser}
                value={user}
              >
                <option value="" disabled selected hidden>
                  نام کاربری
                </option>
                <option value="">همه کاربران</option>
                {users.map((item, index) => (
                  <option key={index} value={item.userName}>
                    {item.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Row>
          {/* <Row>
            <FormGroup>
              <Input
                type="select"
                name="type"
                bsSize="sm"
                onChange={handleChangePrice}
                value={price}
                disabled
              >
                <option hidden value="">
                  نوع
                </option>
                <option value="income">درآمد</option>
                <option value="cost">هزینه</option>
              </Input>
            </FormGroup>
          </Row> */}
        </Form>
      </div>
    </>
  );
};

export default Filters;

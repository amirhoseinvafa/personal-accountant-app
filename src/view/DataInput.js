import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

import { users } from "../inital-data/initalData";

const DataInput = ({ onSaved, editItem }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset({ ...editItem });
  }, [editItem]);
  return (
    <>
      <Form onSubmit={handleSubmit(onSaved)}>
        <Input type="hidden" name="id" innerRef={register} />
        <FormGroup>
          <Label for="exampleEmail">عنوان</Label>
          <Input
            innerRef={register({ required: true })}
            type="text"
            name="title"
            size="sm"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">مبلغ</Label>

          <Input
            innerRef={register({ required: true })}
            type="number"
            name="price"
            size="sm"
          />
        </FormGroup>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="exampleSelect">دسته بندی</Label>
              <Input
                innerRef={register({ required: true })}
                type="select"
                name="category"
                bsSize="sm"
              >
                <option value="">انتخاب کنید</option>
                {users.map((item, index) => (
                  <option key={index} value={item.userName}>
                    {item.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>نوع</Label>
              <Input
                innerRef={register({ required: true })}
                type="select"
                name="type"
                bsSize="sm"
              >
                <option value="">انتخاب کنید</option>
                <option value="income">درآمد</option>
                <option value="cost">هزینه</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">
          ذخیره
        </Button>
      </Form>
    </>
  );
};

export default DataInput;

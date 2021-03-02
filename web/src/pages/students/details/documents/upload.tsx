import React, { useState } from "react";
import Form, { StyledFormActions } from "../../new/form";
import { Row, Col } from "react-grid-system";
import { Input } from "../../new";
import Button from "../../../../components/Button";
import colors from "../../../../styles/colors";
import DND from "./dnd";
import { useForm } from "react-hook-form";
import Axios from "axios";

const UplaodDocument = ({ student, setIsOpen }: any) => {
  const { register, errors, handleSubmit } = useForm();
  const [file, setFile] = useState(null);

  const handleDrag = (files: any) => {
    setFile(files[0]);
  };

  const onSubmit = (data: any) => {
    let type = "1";

    switch (data.doc_type) {
      case "Fee Statement":
        type = "4";
        break;
      case "Conset form":
        type = "1";
        break;
      case "Perfomance":
        type = "2";
        break;
      case "Application Details":
        type = "2";
        break;

      default:
        type = "1";
    }
    const formData = new FormData();
    if (!!file) {
      formData.append("document", file || new Blob());
    }

    formData.append("student", student);
    formData.append("doc_type", type);
    formData.append("desc", data.desc);
    formData.append("name", data.name);

    Axios({
      url: "http://localhost:8000/api/student/documents/",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res: any) => {
        console.log(res);
        setIsOpen(false);
      })
      .catch((e: any) => {
        console.log(e.response, "");
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-header">
        <h2> Upload Document </h2>
      </div>

      <fieldset>
        <Row className="pt">
          <Col sm={2}>
            {" "}
            <label> Source </label>{" "}
          </Col>
          <DND handleDrag={handleDrag} file={file} />
          <Col sm={6}></Col>
        </Row>
        <Row className="pt">
          <Input
            register={register({ required: true })}
            label="Document Name"
            name="name"
          />
        </Row>

        <Row className="pt">
          <Input
            register={register({ required: true })}
            label="Document Type"
            name="doc_type"
            dropdown={true}
            options={[
              "Conset form",
              "Perfomance",
              "Application Details",
              "Fee Statement",
            ]}
          />
        </Row>

        <Row className="pt">
          <Input
            register={register({ required: true })}
            label="Desc"
            name="desc"
            type="text"
          />
        </Row>
      </fieldset>

      <StyledFormActions>
        <Button background={colors.primary} color="white">
          {" "}
          Save{" "}
        </Button>
        <Button onClick={() => setIsOpen(false)} type="button">
          {" "}
          Cancel{" "}
        </Button>
      </StyledFormActions>
    </Form>
  );
};

export default UplaodDocument;

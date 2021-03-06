import Button from "components/Button";
import { Input } from "pages/students/new";
import Form, { StyledFormActions } from "pages/students/new/form";
import * as React from "react";
import { Row } from "react-grid-system";
import { useForm } from "react-hook-form";
import colors from "styles/colors";
import { StyledEdit } from "../edit";

interface IEditSchoolDetailsProps {
  setOpen: any;
  studentSchool: any;
  refetch: any;
}

const EditSchoolDetails: React.FC<IEditSchoolDetailsProps> = ({
  setOpen,
  refetch,
  studentSchool,
}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: studentSchool.name,
      phone: studentSchool.form,
      contact: studentSchool.contact,
      address: studentSchool.address,
    },
  });
  const onSubmit = (data: any) => {};

  return (
    <StyledEdit>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Row className="pt">
            <Input
              label="School Name"
              name="name"
              type="text"
              disabled
              error={errors.name}
              register={register({ required: false })}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Phone"
              name="phone"
              type="text"
              error={errors.phone}
              disabled
              register={register({ required: false })}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Contact"
              name="contact"
              type="text"
              disabled
              error={errors.contact}
              register={register({ required: false })}
            />
          </Row>

          <Row className="pt">
            <Input
              label="Address"
              name="address"
              type="text"
              disabled
              error={errors.address}
              register={register({ required: false })}
            />
          </Row>
        </fieldset>
        <StyledFormActions>
          <Button onClick={() => setOpen(false)}> Cancel </Button>
        </StyledFormActions>
      </Form>
    </StyledEdit>
  );
};

export default EditSchoolDetails;

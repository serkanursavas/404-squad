import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { dummyUserInfo } from "../../dummyData/UserData";
import { UserInfo } from "../../types/UserTypes";
import { userUpdateValidationSchema } from "../../validators/userUpdateValidation";
import { Form, Formik } from "formik";
import Input from "../../components/ui/Input";
import SelectInput from "../../components/form/SelectInput";
import { SelectOption } from "../../types/FormTypes";

const roles: SelectOption[] = [
  { value: "USER", label: "USER" },
  { value: "MANAGER", label: "MANAGER" },
  { value: "ADMIN", label: "ADMIN" },
];

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = () => {
    const confirmed = window.confirm("Are you sure you want to reset the user's password?");
    if (confirmed) {
      console.log(`Password reset for user with ID: ${id}.`);
      alert("Password has been reset successfully!");
    }
  };

  useEffect(() => {
    if (id) {
      const userId = parseInt(id);
      const userToUpdate = dummyUserInfo.find((user) => user.id === userId);

      if (userToUpdate) {
        setUser(userToUpdate);
      }
    }
  }, [id]);

  const handleSubmit = async (values: UserInfo) => {
    setIsLoading(true);
    const updatedFields = Object.keys(values).reduce((acc, key) => {
      if (user && values[key as keyof UserInfo] !== user[key as keyof UserInfo]) {
        acc[key as keyof UserInfo] = values[key as keyof UserInfo] as any;
      }
      return acc;
    }, {} as Partial<UserInfo>);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Object.keys(updatedFields).length > 0) {
      console.log("Fields to update:", updatedFields);
      console.log("User updated successfully", values);
      alert("User has been updated successfully!");
      setIsLoading(false);
      navigate("/admin/users");
    } else {
      alert("No changes detected!");
      console.log("No fields were updated.");
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto bg-white md:w-6/12">
      <Formik
        initialValues={user}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={userUpdateValidationSchema}
      >
        {({ touched, errors, setFieldValue, values }) => {
          return (
            <Form className="p-8">
              <h1 className="text-2xl text-center text-primary">Update User</h1>
              <div className="flex flex-col pt-4 space-y-10">
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  error={touched.username && errors.username ? errors.username : false}
                />

                <SelectInput
                  label="Role"
                  name="role"
                  options={roles}
                  placeholder="Select role"
                  setFieldValue={(field, value) => setFieldValue(field, value)}
                  error={touched.role && errors.role ? errors.role : false}
                />

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    label={isLoading ? "Updating..." : "Update"}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    label="Reset Password"
                    onClick={handleResetPassword}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

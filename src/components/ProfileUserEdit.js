import { Formik } from "formik";
import { ScrollView, useToast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { EditProfileValidationSchema } from "../validation/formValidation";
import ToastAlert from "./ToastAlert";
import { updateRecord, storeObject } from "../api/apiClient";

export const ProfileUserEdit = ({ connectedUser }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (connectedUser) {
      setInitialValues({
        name: connectedUser.name || "",
        phone: connectedUser.phone || "",
        address: connectedUser.street || "",
      });
    }
  }, [connectedUser]);

  const handleSubmit = async (values) => {
    setIsLoading(false);
    try {
      const response = await updateRecord(
        connectedUser.sessionId,
        connectedUser.password,
        "res.users",
        connectedUser.sessionId,
        {
          name: values.name,
          phone: values.phone,
          street: values.address,
        }
      );

      console.log("API Response:", response);

      if (response) {
        const updatedUser = {
          ...connectedUser,
          name: values.name,
          phone: values.phone,
          address: values.address,
        };
        await storeObject("connectedUser", updatedUser);

        toast.show({
          render: () => (
            <ToastAlert
              title={"Succès"}
              description={"Vos informations ont été mises à jour avec succès."}
              status={"success"}
              isClosable={true}
              variant={"left-accent"}
              duration={5000}
            />
          ),
        });
      } else {
        throw new Error("Échec de la mise à jour sur le serveur.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      toast.show({
        title: "Erreur",
        description: "La mise à jour des informations a échoué.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      w={"full"}
      mx={"auto"}
      px={"10"}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={EditProfileValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isValid }) => (
          <VStack space={4}>
            <CustomInput label="Nom" name="name" keyboardType="default" />
            <CustomInput
              label="Téléphone"
              name="phone"
              keyboardType="phone-pad"
            />
            <CustomInput
              label="Adresse"
              name="address"
              keyboardType="default"
            />
            <CustomButton
              title="Confirmer"
              onPress={handleSubmit}
              isDisabled={!isValid}
              loading={isLoading} // Désactiver le mode chargement par défaut
            />
          </VStack>
        )}
      </Formik>
    </ScrollView>
  );
};
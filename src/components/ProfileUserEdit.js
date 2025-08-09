import { Formik } from "formik";
import { ScrollView, useToast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { EditProfileValidationSchema } from "../validation/formValidation";
import { useThemeContext } from "../hooks/ThemeContext";
import ToastAlert from "./ToastAlert";
import { update } from "../../http/http";
import { getUserInfo } from "../utils/AuthService";

export const ProfileUserEdit = () => {
  const { isDarkMode } = useThemeContext();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    phone: "",
    street: "",
  });

  const fetchUser = async () => {
    setIsLoading(true);
    setUser(await getUserInfo());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await update("res.users", user.id, {
        name: values.name,
        phone: values.phone,
        street: values.street,
      });

      if (response) {
        toast.show({
          render: () => (
            <ToastAlert
              title={"Succès"}
              description={"Vos informations ont été mises à jour avec succès."}
              status={"success"}
              isClosable={true}
              variant={"left-accent"}
              duration={3000}
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
      setIsLoading(false);
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
        initialValues={user}
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
              name="street"
              keyboardType="default"
              isDarkMode={isDarkMode}
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

import express from "express";
import {auth} from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import SettingsValidations from "./Settings.validation";
import SettingsController from "./Settings.controller";


const settingsRouter = express.Router();

//help and support routes
settingsRouter.post(
    "/submit-help-and-support",
    // auth(),
    validateRequest(SettingsValidations.helpAndSupportValidation),
    SettingsController.submitHelpAndSupport
);

settingsRouter.get(
    "/get-help-and-support",
    // auth(),
    // validateRequest(SettingsValidations.helpAndSupportValidation),
    SettingsController.getHelpAndSupport
);
settingsRouter.delete(
    "/delete-help-and-support/:supportId",
    // auth(),
    // validateRequest(SettingsValidations.helpAndSupportValidation),
    SettingsController.deleteHelpAndSupport
);


//privacy policy
settingsRouter.get(
    "/get-privacy-policy",
    SettingsController.getPrivacyPolicy
);

settingsRouter.patch(
    "/update-privacy-policy/:id",
    validateRequest(SettingsValidations.settingsValidationSchema),
    SettingsController.editPrivacyPolicy
);

//terms and conditions
settingsRouter.get(
    "/get-terms-and-conditions",
    SettingsController.getTermsConditions
);

settingsRouter.patch(
    "/update-terms-and-conditions/:id",
    validateRequest(SettingsValidations.settingsValidationSchema),
    SettingsController.editTermsConditions
);


export default settingsRouter;
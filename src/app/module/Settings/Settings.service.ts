import ApiError from "../../../error/ApiError";
import { IHelpAndSupport, ISettings } from "./Settings.interface";
import SettingsModel from "./Settings.model";

//help and support service
const submitHelpAndSupportService = async (payload: IHelpAndSupport) => {

    const result = await SettingsModel.HelpAndSupportModel.create({...payload});

    if (!result) {
        throw new ApiError(500, "Failed to submit help and support request");
    }

    return result;
};

const getHelpAndSupportService = async () => {

    const result = await SettingsModel.HelpAndSupportModel.find({}).lean();

    return result;
};

const deleteHelpAndSupportService = async (id: string) => {

    const result = await SettingsModel.HelpAndSupportModel.findByIdAndDelete(id);

    if (!result) {
        throw new ApiError(500, "Failed to delete this report.");
    }

    return result;
};


//! Privacy and policy

const getPrivacyPolicy = async () => {

  return await SettingsModel.PrivacyPolicyModel.findOne({});

};

const editPrivacyPolicy = async (id: string, payload: ISettings) => {

  
  const result = await SettingsModel.PrivacyPolicyModel.findByIdAndUpdate(id , {...payload}, {
    new: true,
    runValidators: true,
  });

  if(!result){
    throw new ApiError(500,"Failed to update privacy policy");
  }

  return result;
};

//terms and consitions

const getTermsConditions = async () => {

    return await SettingsModel.TermsConditionsModel.findOne({});

};

const editTermsConditions = async (id: string,payload: ISettings) => {

    
    const result = await SettingsModel.TermsConditionsModel.findByIdAndUpdate( id , payload, {
        new: true,
        runValidators: true,
    });

    if(!result){
        throw new ApiError(500,"failed to update Terms and conditions");
    }
    
    return result;
};

const SettingsServices = { 
    submitHelpAndSupportService,
    getHelpAndSupportService,
    deleteHelpAndSupportService,
    getPrivacyPolicy,
    editPrivacyPolicy,
    getTermsConditions,
    editTermsConditions
 };

export default SettingsServices;
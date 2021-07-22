import { Component } from 'react';

export default class Api extends Component {
  static baseUrl = Api.getBaseUrl();

  // /2021-06-12_08-48-46_WarehouseStock.xlsx
  static loginUrl = `${Api.baseUrl}users/login`;

  static forgetPasswordUrl = `${Api.baseUrl}users/forgotPassword`;

  static getAdminProfile = `${Api.baseUrl}admin/getAdmin`;

  static updateAdminProfile = `${Api.baseUrl}admin/updateAdmin`;

  static getAllProducts = `${Api.baseUrl}product/getAllProducts`;

  static addNewProducts = `${Api.baseUrl}product/addProductName`;

  static getAllSizes = `${Api.baseUrl}size/getAllSizes`;

  static addNewProductSize = `${Api.baseUrl}size/addProductSize`;

  static getSizeById = `${Api.baseUrl}size/getSizeById`;

  static updateSizeById = `${Api.baseUrl}size/updateSizeById`;

  static getAllColors = `${Api.baseUrl}color/getAllColours`;

  static getColourById = `${Api.baseUrl}color/getColourById`;

  static updateColourById = `${Api.baseUrl}color/updateColourById`;

  static addNewProductColor = `${Api.baseUrl}color/addColour`;

  static adminProfile = `${Api.baseUrl}admin/getAdmin`;

  static updateAdminProfile = `${Api.baseUrl}admin/updateAdmin`;

  static getAllOutlets = `${Api.baseUrl}warehouse/getAllOutlets`;

  static getOutletsById = `${Api.baseUrl}warehouse/getOutletById`;

  static getAllStates = `${Api.baseUrl}state/getAllStates`;

  static getAllCities = `${Api.baseUrl}city/getCityById`;

  static getAllLocations = `${Api.baseUrl}address/getAllAreas`;

  static getAllProducts = `${Api.baseUrl}product/getAllProducts`;

  static addInstitute = `${Api.baseUrl}institute/addInstitute`;

  static getAllInstitute = `${Api.baseUrl}institute/findAllInstitutes`;

  static getInstituteById = `${Api.baseUrl}institute/findInstituteById`;

  static updateInstitute = `${Api.baseUrl}institute/updateInstituteById`;

  static deleteInstitute = `${Api.baseUrl}institute/deleteInstitute`;

  static getAllBranch = `${Api.baseUrl}branch/findAllInstituteAndBranch`;

  static updateInstituteBranchById = `${Api.baseUrl}branch/updateInstituteBranchById`;

  static addNewInstituteAndBranch = `${Api.baseUrl}institute/addInstituteAndBranch`;

  static getBranchByInstitute = `${Api.baseUrl}institute/findBranchByInstituteId`;

  static addNewBranch = `${Api.baseUrl}branch/addBranch`;

  static findBranchById = `${Api.baseUrl}branch/findBranchById`;

  static allocateStockToOutlet = `${Api.baseUrl}warehouse/allocateStockToOutlet`;

  static getWarehouseStockHistory = `${Api.baseUrl}warehouse/getStockHistory`;

  static addNewStockToWarehouse = `${Api.baseUrl}warehouse/addStockToWarehouse`;

  static addProductName = `${Api.baseUrl}product/addProductName`;

  static addProductColour = `${Api.baseUrl}product/addColour`;

  static manageWarehouseStock = `${Api.baseUrl}warehouse/getWarehouseStock`;

  static outletProfile = `${Api.baseUrl}outlet/getOutletDetails`;

  static updateOutletDetails = `${Api.baseUrl}outlet/updateOutletDetails`;

  static addOutlet = `${Api.baseUrl}warehouse/addOutletByAdmin`;

  static getAllGstTypes = `${Api.baseUrl}warehouse/getAllGsttypes`;

  static changePassword = `${Api.baseUrl}users/createNewPassword`;

  static getAllocatedStockByOutletid = `${Api.baseUrl}warehouse/getAllocatedStockByOutletid`;

  static getSoldProductHistory = `${Api.baseUrl}outlet/getSoldProductHistory`;

  static getOutletIncomingStock = `${Api.baseUrl}outlet/getOutletIncomingStock`;

  static getOutletOverallStock = `${Api.baseUrl}outlet/getOutletOverallStock`;

  static updateQuantitySoldAndSalePrice = `${Api.baseUrl}outlet/updateQuantitySoldAndSalePrice`;

  static getTodaysAllocation = `${Api.baseUrl}warehouse/todaysStockAllocation`;

  static getAllBrandsList = `${Api.baseUrl}brand/getAllBrand`;

  static getBrandById = `${Api.baseUrl}brand/getBrandById`;

  static addNewBrand = `${Api.baseUrl}brand/addBrand`;

  static updateBrand = `${Api.baseUrl}brand/updateBrandDetailsById`;

  static deleteBrand = `${Api.baseUrl}brand/deleteBrand`;

  static getAllCategories = `${Api.baseUrl}category/getAllCategory`;

  static getCategoryById = `${Api.baseUrl}category/getCategoryById`;

  static addNewCategory = `${Api.baseUrl}category/addCategory`;

  static updateCategory = `${Api.baseUrl}category/updateCategoryDetailsById`;

  static deleteCategory = `${Api.baseUrl}category/deleteCategory`;

  static getAllGender = `${Api.baseUrl}gender/getAllGender`;

  // csv 
  static getWarehouseStockCSV = `${Api.baseUrl}warehouse/warehouseStockCSV`;

  static getWarehouseStockHistoryCSV = `${Api.baseUrl}warehouse/warehouseStockHistoryCSV`;

  static getOutletOverallStockCSV = `${Api.baseUrl}outlet/getOutletOverallStockCSV`;

  static getSoldProductHistoryCSV = `${Api.baseUrl}outlet/getSoldProductHistoryCSV`;

  static getIncomingStockHistoryCSV = `${Api.baseUrl}outlet/getIncomingStockHistoryCSV`;

  static getIndividualOutletOverallStockCSV = `${Api.baseUrl}warehouse/getIndividualOutletOverallStockCSV`;

  // Get base URL of APIs
  static getBaseUrl() {
    const env = 'dev';
    let url = '';
    switch (env) {
      case 'production':
        url = '';
        break;
      // Default: development server
      default:
        url = 'https://gwsjhmvf96.execute-api.ap-south-1.amazonaws.com/dev/';
        break;
    }
    return url;
  }

  environment;

  constructor(props) {
    super(props);
    this.state = {};
    this.getBaseUrl = this.getBaseUrl.bind(this);
  }
}

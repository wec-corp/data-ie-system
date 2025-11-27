import axios from 'axios';
import { API_BASE_URL } from '../config';

const API_URL = API_BASE_URL || 'http://localhost:3000';

export const fetchConstructionList = async (params: {
  TypeOfConstructionId?: number | string;
  LicenseId?: number | string;
  ProvinceId?: number | string;
  DistrictId?: number | string;
  CommuneId?: number | string;
  BasinId?: number | string;
  StartDate?: number | string;
  Status?: boolean;
  LicensingAuthorities?: number | string;
  Keyword?: number | string;
  PageIndex?: number;
  PageSize?: number;
  DamType?: number | string;
}) => {
  try {
    const response = await axios.get('/Construction/list', {
      params,
      withCredentials: true,
    });

    // Extract ConstructionName from the response
    const constructionNames = response.data.map((item: { ConstructionName: string }) => ({
      value: item.ConstructionName,
      label: item.ConstructionName,
    }));

    return constructionNames;
  } catch (error) {
    console.error('Error fetching construction list:', error);
    throw error;
  }
};
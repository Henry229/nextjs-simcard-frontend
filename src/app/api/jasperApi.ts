import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // 백엔드 서버 주소

// Status 타입 정의
type JasperStatus = 'ACTIVATED' | 'DEACTIVATED';

interface ChangeStatusParams {
  iccid: string;
  newStatus: JasperStatus;
}

// 함수 반환값을 위한 인터페이스 (예시, 실제 반환 데이터 구조에 맞게 수정 필요)
interface ChangeStatusResponse {
  success: boolean;
  message: string;
}

export const changeJasperStatus = async (
  iccid: string,
  newStatus: JasperStatus
): Promise<ChangeStatusResponse> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/jasper/devices/${iccid}`,
      { status: newStatus }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching SIMCards:', error);
    throw error;
  }
};

export const searchJasperDeviceByIccid = async (iccid: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/jasper/devices/`, {
      params: { iccid },
    });
    console.log('Jasper API Search Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching Jasper device:', error);
    throw error;
  }
};

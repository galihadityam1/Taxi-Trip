import { API_BASE_URL } from "@/app/utils/constant";
import { params } from "@/Types";

export const fetchTrips = async (params: params) => {
    try {
        let url = API_BASE_URL + "/trips?"

        if(params){
            if (params.time) {
                url += `&time=${params.time}`
            }
            if (params.fare) {
                url += `&fare=${params.fare}`
            }
            if (params.distance) {
                url += `&distance=${params.distance}`
            }
            if (params.payment) {
                url += `&payment=${params.payment}`
            }
        }

        const response = await fetch(
            url,
            {
                cache: 'no-cache'
            });


        if (!response.ok) alert("Error Fetching Data")
        const data = await response.json();
        return data

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
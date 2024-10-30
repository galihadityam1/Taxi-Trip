import { API_BASE_URL } from "@/app/utils/constant";

export const fetchTrips = async (params: any) => {
    try {
        let url = API_BASE_URL + "/trips?"

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

        let response = await fetch(
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
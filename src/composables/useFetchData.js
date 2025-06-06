import { ref } from 'vue';
import { useRoute} from 'vue-router';
const databaseUrl = import.meta.env.VITE_DATABASE_URL;
export function useFetchData() {

    const route = useRoute();
    const items = ref([]);
    const total = ref(0);
    const filter = ref();
    const error = ref({
        technicalMessage: '',
        publicMessage: ''
    });

    const isLoading = ref({
        active:false,
        message:'Fetching Dogs...'
    });

    const page = ref(0);
    const pageSize = ref(10);

    const fetchData = async () => { 

        isLoading.value = {
            ...isLoading.value,
            active:true
        };
        
        items.value = [];

        try { 
            let url = databaseUrl; 
            if (route.query){
                const pageParam = route.query.page - 1;
                const pageSizeParam = route.query.pageSize;
                const filterParam = route.query.filter;

                page.value = pageParam ? parseInt(pageParam) : 0;
                pageSize.value = pageSizeParam ? parseInt(pageSizeParam) : 10;

                const queryParams = new URLSearchParams({
                    page: page.value,
                    pageSize: pageSize.value
                });

                if (filterParam) {
                    queryParams.append('filter', filterParam);
                    filter.value = filterParam;
                }
                
                url = `${url}?${queryParams.toString()}`;
                console.log(url);
            }

            const response = await fetch(url);
            const data = await response.json();

            items.value = data.items.filter(item => typeof item === 'object' && item !== null);
            total.value = data.total;

        } catch (err) {
            error.value = {
                technicalMessage: err.message,
                publicMessage: 'There was an error fetching your data. Please try again later.'
            };
            console.log(error.value.message);
            items.value = [];
            total.value = 0;
        } finally {
            isLoading.value = {
                ...isLoading.value,
                active:false
            }
        }
    }

    fetchData();
    
    return {
        isLoading,
        error,
        items,
        page,
        pageSize,
        total,
        filter,
        fetchData
    }
}
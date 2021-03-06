import { defineComponent,computed,PropType} from 'vue';
import {BdjfResponse} from "bdjf_http";
import './clam_view.css'
import '@/assets/css/skeleton.css'

type ViewStatusType = 'LOADING'|'EMPTY'|'SHOW'|'ERROR';

interface ClamProp {
    res:BdjfResponse<any>;
    emptyText:string;
    noPackage:boolean;
}

export default defineComponent({
    name:'ClamViewTSX',
    props:{
        res: {
            type:Object as PropType<BdjfResponse<any>>,
            required:true
        },
        emptyText:{
            type: String,
            default:()=>{
                return '暂无数据';
            }
        },
        noPackage:{
            type: Boolean,
            default:()=>{
                return false;
            }
        }
    },
    setup(props:ClamProp,{ slots }) {

        const viewStatusAdapter = (response: BdjfResponse<any>): ViewStatusType => {
            // console.log('----viewStatusAdapter----',response)

            if (!response) {
                return "LOADING";
            }

            if(response.isLoading){
                return "LOADING";
            }

            if(response.success){
                if (!response.data || response.data.length === 0) {
                    return "EMPTY";
                } else {
                    return "SHOW";
                }
            }else{
                return 'ERROR';
            }
        }

        const viewStatus = computed<ViewStatusType>(()=>{
            return viewStatusAdapter(props.res)
        })

        const noDataView = (text:string)=>{
            return (
                <div class="empty_view col-center item-center">
                    {text}
                </div>
            )
        }

        const emptyView = ()=>{
            if(viewStatus.value === 'EMPTY'){
                return slots.empty?slots.empty():noDataView(props.emptyText);
            }
        }

        const errorView = ()=>{
            if(viewStatus.value === 'ERROR'){
                 return slots.error?slots.error():noDataView(props.res.msg!);
            }
        }



        return () => {
            const res = props.res;
            
            if(viewStatus.value === 'EMPTY'){
                return emptyView();
            }else if(viewStatus.value === 'ERROR'){
                return errorView();
            }else {
                if(props.noPackage){
                    return slots.default?.({
                        data:res.data,
                        vClass:viewStatus.value==='LOADING'?'skeleton-view-empty-view':'skeleton-view-default-view',
                        coverClass:viewStatus.value==='LOADING'?'cover':''
                    })
                }else {
                    return (
                        <div  class={viewStatus.value==='LOADING'?'skeleton-view-empty-view':'skeleton-view-default-view'}>
                            {slots.default?.({
                                data:res.data,
                                coverClass:viewStatus.value==='LOADING'?'cover':''
                            })}
                        </div>
                    )
                }
            }
        }
    }
})

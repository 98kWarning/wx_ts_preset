import { defineComponent,computed } from 'vue';
import {ResponseBean} from "bdjf_http";
import './clam_view.css'
import '@/assets/css/skeleton.css'

type ViewStatusType = 'LOADING'|'EMPTY'|'SHOW'|'ERROR';


interface ClamProps{
    res:ResponseBean;
    showLoading:boolean;
    emptyText:string;
    emptyData:Record<string,unknown>;
    noPackage:boolean;
}

export default defineComponent({
    name:'ClamViewTSX',
    props:{
        res: {
            type:ResponseBean,
            default:()=>{
                return new ResponseBean().loading();
            },
            required:true
        },
        showLoading :{
            type: Boolean,
            default:()=>{
                return false;
            }
        },
        emptyText:{
            type: String,
            default:()=>{
                return '暂无数据';
            }
        },
        emptyData:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        noPackage:{
            type: Boolean,
            default:()=>{
                return false;
            }
        }
    },
    setup(props:ClamProps,{ slots }) {

        const viewStatusAdapter = (response: ResponseBean): ViewStatusType => {
            // console.log('----viewStatusAdapter----',response)
            if (props.showLoading) {
                return "LOADING";
            }
            if (!response) {
                return "LOADING";
            }
            if(response.success){
                if (!response.data || response.data.length === 0) {
                    return "EMPTY";
                } else {
                    return "SHOW";
                }
            }
            switch (response.code) {
                case -100:
                    return "LOADING";
                default:
                    return "ERROR";
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
                 return slots.error?slots.error():noDataView(props.res.msg);
            }
        }



        return () => {
            const res = props.res;

            const emptyData = props.emptyData;
            
            if(viewStatus.value === 'EMPTY'){
                return emptyView();
            }else if(viewStatus.value === 'ERROR'){
                return errorView();
            }else {
                if(props.noPackage){
                    return slots.default({
                        data:viewStatus.value==='LOADING'?(res.data||emptyData):res.data,
                        vClass:viewStatus.value==='LOADING'?'skeleton-view-empty-view':'skeleton-view-default-view',
                        coverClass:viewStatus.value==='LOADING'?'cover':''
                    })
                }else {
                    return (
                        <div  class={viewStatus.value==='LOADING'?'skeleton-view-empty-view':'skeleton-view-default-view'}>
                            {slots.default({
                                data:viewStatus.value==='LOADING'?(res.data||emptyData):res.data,
                                coverClass:viewStatus.value==='LOADING'?'cover':''
                            })}
                        </div>
                    )
                }
            }
        }
    }
})

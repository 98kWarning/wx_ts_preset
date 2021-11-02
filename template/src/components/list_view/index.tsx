import {computed, defineComponent, nextTick, onMounted, onUpdated, PropType, ref, watch} from 'vue';
import './list_view.css'
import '@/assets/css/skeleton.css'

import { useRect, useScrollParent, useEventListener } from '@/use';
import {isHidden} from "@/util";

type ViewStatusType = 'INIT'|'SHOW'|'ERROR'|'FINISHED'|'EMPTY';

export default defineComponent({
    name:'ListViewTSX',
    props:{
        listData: {
            type: Array,
            default: () => {
                return [];
            },
        },
        bindKey:{
            type: [String,Function],
            default:() => null
        },
        loading: {
            type: Boolean,
            default: () => false,
        },
        error: {
            type: Boolean,
            default: () => false,
        },
        finished: {
            type: Boolean,
            default: () => false,
        },
        emptyText: {
            type: String,
            default: () => {
                return "暂无数据";
            },
        },
        emptyItem: {
            type: Object,
            default: () => {
                return {};
            }
        },
        placeCount:{
            type: Number,
            default: () => {
                return 10;
            }
        },
        loadingText: {
            type: String,
            default: () => "加载中...",
        },
        finishedText: {
            type: String,
            default: () => "没有更多了",
        },
        errorText: {
            type: String,
            default: () => "加载失败了，点我重新加载",
        },
        offset: {
            type: Number,
            default: () => 100,
        },
        immediateCheck: {
            type: Boolean,
            default: () => true,
        },
        direction: {
            type: String as PropType<'up' | 'down'>,
            default: 'down',
        },
        noPackage:{
            type: Boolean,
            default:()=>{
                return false;
            }
        }
    },
    emits: ['load', 'update:error', 'update:loading'],
    setup(props,{ emit, slots }) {

        const loading = ref(false);
        const root = ref<HTMLElement>();
        const placeholder = ref<HTMLElement>();
        const scrollParent = useScrollParent(root);

        const check = () => {
            nextTick(() => {
                if (loading.value || props.finished || props.error) {
                    return;
                }

                const { offset,direction } = props;
                const scrollParentRect = useRect(scrollParent);

                if (!scrollParentRect.height || isHidden(root)) {
                    return false;
                }

                let isReachEdge = false;
                const placeholderRect = useRect(placeholder);

                if (direction === 'up') {
                    isReachEdge = scrollParentRect.top - placeholderRect.top <= offset;
                } else {
                    isReachEdge =
                        placeholderRect.bottom - scrollParentRect.bottom <= offset;
                }

                if (isReachEdge) {
                    loading.value = true;
                    emit('update:loading', true);
                    emit('load');
                }
            });
        };

        watch([() => props.loading, () => props.finished], check);

        onUpdated(() => {
            loading.value = props.loading!;
        });

        onMounted(() => {
            if (props.immediateCheck) {
                check();
            }
        });

        useEventListener('scroll', check, { target: scrollParent });



        const clickErrorText = () => {
            emit('update:error', false);
            check();
        };



        const viewStatus = computed<ViewStatusType>(():ViewStatusType => {
            if (props.listData.length === 0 && props.loading) {
                return "INIT";
            }
            if (props.listData.length === 0 && props.finished) {
                return "EMPTY";
            }
            if (props.error) {
                return "ERROR";
            }
            if (props.finished) {
                return "FINISHED";
            }
            return "SHOW";
        });

        const listData = computed(()=>{
            if(viewStatus.value==='INIT'){
                const emptyArr = [];
                const count = props.placeCount>10?10:props.placeCount;
                for(let i=0;i<count;i++){
                    emptyArr.push(props.emptyItem);
                }
                return emptyArr;
            }else if(viewStatus.value === 'EMPTY'){
                return []
            }
            return props.listData;
        })


        const itemKeyFun = (item,index):string => {
            if(viewStatus.value==='INIT'){
                return index;
            }
            if(!props.bindKey){
                return index;
            }else{
                if(props.bindKey instanceof Function){
                    return props.bindKey(item,index);
                }else{
                    return item[props.bindKey]
                }
            }
        }


        const contentList = () =>{
            if(props.noPackage){
                return listData.value.map((e,index)=>{
                    return slots.default?.({
                            item:e,
                            index:index,
                            vClass:viewStatus.value==='INIT'?'skeleton-view-empty-view':'skeleton-view-default-view'
                        })
                })
            }else{
                return listData.value.map((e,index)=>{
                    return (
                        <div key={itemKeyFun(e,index)} class={viewStatus.value==='INIT'?'skeleton-view-empty-view':'skeleton-view-default-view'}>{
                            slots.default?.({
                                item:e,
                                index:index
                            })}
                        </div>
                    )
                })
            }
        }

        const renderFinishedText = () => {
            if (viewStatus.value === 'FINISHED') {
                const text = slots.finished ? slots.finished() : props.finishedText;
                if (text) {
                    return <div class='list-view-center'>{text}</div>;
                }
            }
        };

        const renderErrorText = () => {
            if (viewStatus.value === 'ERROR') {
                const text = slots.error ? slots.error() : props.errorText;
                if (text) {
                    return (
                        <div class='list-view-center' onClick={clickErrorText}>
                            {text}
                        </div>
                    );
                }
            }
        };

        const renderLoading = () => {
            if (viewStatus.value === 'SHOW') {
                return (
                    <div class='list-view-center'>
                        {slots.loading ? (
                            slots.loading()
                        ) : (
                            <div class='list-view-center' onClick={clickErrorText}>
                                加载中...
                            </div>
                        )}
                    </div>
                );
            }
        };


        return () => {
            const Content = contentList();
            const Placeholder = <div ref={placeholder}  />;

            return (
                <div ref={root} role="feed" >
                    {props.direction === 'down' ? Content : Placeholder}
                    {renderLoading()}
                    {renderFinishedText()}
                    {renderErrorText()}
                    {props.direction === 'up' ? Content : Placeholder}
                </div>
            );
        }
    }
})

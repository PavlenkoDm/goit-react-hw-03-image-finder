import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const Loader = () => {
    return <div>{Loading.standard()}</div>
}
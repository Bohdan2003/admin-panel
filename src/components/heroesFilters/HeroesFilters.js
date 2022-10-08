import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import store from '../../store';

import { activeFilterChanged, fetchFilters, selectAll } from './filtersSlice';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const filters = selectAll(store.getState());

    // console.log(filters);

    const { activeFilter, filtersLoadingStatus} = useSelector(state => state.filters);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchFilters());
    },[]);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(({name, label, className}, i)=>
                        <button 
                            key={i}
                            className={`btn ${className} ${activeFilter===name? 'active' : ''}`}
                            onClick={()=>dispatch(activeFilterChanged(name))}
                        >{label}</button>)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
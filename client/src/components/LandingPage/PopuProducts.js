import React, { useEffect } from "react";
import "./Banners.css";
import "../NavBar/NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Actions/Actions";
import Catalogue from "../Catalogue/Catalogue";
import ProductCard from "../ProductCard/ProductCard";

export default function PopuProducts () {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.getAllProducts);

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <div className='width'>
            <div className='master'>
                <div>
                    <h1>Productos Populares</h1>
                    {/* <hr className='horizontal' /> */}
                </div>
                <div className='row'>
                    {products?.map((product) => {
                        return <ProductCard product={product} />;
                    })}
                </div>
            </div>
        </div>
    );

}
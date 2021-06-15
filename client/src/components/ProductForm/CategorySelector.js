import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  deleteProductCategory,
  editProductCategory,
  getProductsDetail,
} from "../../Actions/Actions";

function CategorySelector({ prod, cats }) {
  const [state, setState] = useState();
  const [prodDet, setProdDet] = useState([]);
  const [empty, setEmpty] = useState(false);
  //   const prodDetail = useSelector((state) => state.getProductsDetail);
  const dispatch = useDispatch();
  let aa;
  useEffect(() => {
    //  dispatch(getProductsDetail(prod.id));
    axios({
      method: "GET",
      url: `http://localhost:3001/products/${prod.id}`,
    }).then(async (res) => {
      aa = await res.data.categories?.map((el) => ({
        value: el.id,
        label: el.name,
      }));
      if (aa.length > 0) {
        setProdDet(aa);
      } else setEmpty(true);
    });
  }, []);

  let options = cats?.map((el) => ({ value: el.id, label: el.name }));

  const handleSelect = (selectedOption) => {
    setState(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("STATE");
    console.log(state);
    console.log("PROD DET");
    console.log(prodDet);
    if ((!state && !prodDet) || state?.length === 0) {
      options.map(async (el) => {
        console.log(el.value);
        await dispatch(deleteProductCategory(prod.id, el.value));
      });
      return;
    } else {
      const inter = prodDet.filter(({ value: id1 }) =>
        state?.some(({ value: id2 }) => id2 === id1)
      );
      const del = prodDet.filter(
        ({ value: id1 }) =>
          !state?.some(({ value: id2 }) => id2 === id1)
      );
      const dif2 = state?.filter(
        ({ value: id1 }) =>
          !prodDet.some(({ value: id2 }) => id2 === id1)
      );
      const set = inter.concat(dif2);

      del.map(async (el) => {
        await dispatch(deleteProductCategory(prod.id, el.value));
      });
      set.map(async (el) => {
        await dispatch(editProductCategory(prod.id, el.value));
      });
    }
  };

  return (
    <div>
      {prodDet.length > 0 ? (
        <Select
          isMulti
          defaultValue={prodDet}
          options={options}
          onChange={handleSelect}
        />
      ) : empty ? (
        <Select isMulti options={options} onChange={handleSelect} />
      ) : null}
      <Button
        variant="contained"
        className="buttonUser"
        onClick={handleSubmit}
      >
        Guardar
      </Button>
    </div>
  );
}

export default CategorySelector;

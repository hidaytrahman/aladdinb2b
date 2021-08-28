import { CircularProgress, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import MainCategory from "./MainCategory";
import { setActiveCategory } from "../../core/utils";
import SubCategory from "../SubCategory";
import { API } from "../../core/constant";
import Loader from "../shared/Loader";

const Categories = () => {

  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeSubcatID, setActiveSubcatID] = useState(null);
  const [lastCategories, setLastCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API.baseUrl}Articles/`)
      .then(function (response) {
        // handle success
        console.log(response);
        setMainCategories(response.data.articles);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setLoading(false);
      });
  }, []);



  const getSubCategories = (e, artId) => {
    setLoading(true);
    setActiveCategory(e.currentTarget);

    if (artId) {
      axios.get(`${API.baseUrl}Articles/${artId}`)
        .then(function (response) {
          // handle success
          setSubCategories(response.data.articles);
          setLoading(false)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }

  }

  useEffect(() => {
    // only run when the subcateg fires
    if (activeSubcatID) {
      setLoading(true);
      axios.get(`${API.baseUrl}Articles/${activeSubcatID}`)
        .then(function (response) {
          // handle success
          setLastCategories(response.data.articles);
          setLoading(false)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setLoading(false)
        })
    }
  }, [activeSubcatID])


  return (
    <section className="categories">
      <h4>Categories</h4>

      <section className="categories-wrapper">
        {
          mainCategories &&
          mainCategories.map((category) => (
            <MainCategory
              category={category}
              getSubCategories={getSubCategories}
              key={category.artId} />
          ))
        }

        <Loader loading={loading} />
      </section>

      {
        subCategories && subCategories.length > 0 &&
        <section className="subcategories-wrapper">
          <aside className="midlevel-category each-category-wrapper">

            {

              subCategories.map((subCateg) => (
                <>
                  <FormControlLabel
                    key={subCateg.artId}
                    control={<Checkbox
                      //checked={state.checkedA} 
                      //onChange={handleChange} 
                      name="checkedA" />}
                    label={subCateg.artTitle}
                  />
                  <SubCategory mainCategories={mainCategories} artId={subCateg.artId}
                    setActiveSubcatID={setActiveSubcatID} />
                </>
              ))
            }

            <Loader loading={loading} />
          </aside>

          <article className="end-level-category each-category-wrapper">

            <FormGroup row>

              {
                lastCategories &&
                lastCategories.map((categ) => (
                  <FormControlLabel key={categ.artId}
                    control={<Checkbox
                      //checked={state.checkedA} 
                      //onChange={handleChange} 
                      name="checkedA" />}
                    label={categ.artTitle} />
                ))
              }

            </FormGroup>

            <Loader loading={loading} />
          </article>
        </section>

      }


    </section>
  )
}

export default Categories;
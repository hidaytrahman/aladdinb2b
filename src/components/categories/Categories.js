import {  FormGroup, FormControlLabel, Checkbox, Box, Tabs, Tab, InputBase, IconButton } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import MainCategory from "./MainCategory";
import { setActiveCategory } from "../../core/utils";
import SubCategory from "../SubCategory";
import { API } from "../../core/constant";
import Loader from "../shared/Loader";
import { a11yProps, TabPanel } from "../../core/mui";


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



  // sub categories handler
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

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <section className="categories">
      <h4>Categories</h4>

      <section className="main-section">

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example">
            <Tab label="What are you offering or selling?" {...a11yProps(0)} />
            <Tab label="What are you looking to buy?" {...a11yProps(1)} />
            <Tab label="Import" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel
          value={tabValue}
          index={0}>


          <div className="search-area">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton className="search-button" type="submit" sx={{ p: '10px' }} aria-label="search">

              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </IconButton>
          </div>


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

        </TabPanel>
        <TabPanel
          value={tabValue}
          index={1}>
          <h2>What are you looking to buy? </h2>
        </TabPanel>
        <TabPanel
          value={tabValue}
          index={2}>
          <h2>Import</h2>
        </TabPanel>

      </section>




    </section>
  )
}

export default Categories;
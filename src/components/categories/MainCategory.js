import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const MainCategory = ({category, getSubCategories}) => {

    return (
        <div className="category" 
            onClick={(e) => getSubCategories(e,category.artId)}>
            <div className="category-icon">
                <BeachAccessIcon style={{ fontSize: 50 }} />
            </div>
            <p className="category-title">{category.artTitle}</p>
        </div>
    )
}

export default MainCategory;
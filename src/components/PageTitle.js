import { Helmet } from "react-helmet-async"
import { PropTypes } from "prop-types"

export const PageTitle = ({title}) => {
    return <Helmet>
        <title>
            {title} | InstaClone
        </title>
    </Helmet>
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
}
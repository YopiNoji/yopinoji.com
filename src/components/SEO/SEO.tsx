import React from "react";
import Helmet from "react-helmet";
import { SiteSiteMetadata, MarkdownRemark } from '../../gatsby-graphql'

type PropsType = {
    postMeta: MarkdownRemark | null | undefined,
    isPost: boolean,
    siteMeta: SiteSiteMetadata | null | undefined,
}

const SEO: React.FC<PropsType> = props => {
    const { postMeta, isPost, siteMeta } = props;
    const title = isPost ? String(siteMeta?.title) + ' | ' + postMeta?.frontmatter?.title : String(siteMeta?.title);
    const description = siteMeta?.description ? siteMeta?.description : '';
    const image = siteMeta?.image ? siteMeta?.siteUrl + siteMeta?.image : '';
    const blogURL = siteMeta?.siteUrl ? siteMeta?.siteUrl : '';
    const postURL = blogURL + ''
    console.log(image)
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: blogURL,
        name: siteMeta?.title,
        alternateName: siteMeta?.title
      }
    ];
    return (
      <Helmet>
        {/* General tags */}
        <title>{title}</title>
        <meta charSet="utf-8" />
        <html lang="ja"/>
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={isPost ? postURL : blogURL} />
        {isPost ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        {/* <meta property="og:description" content={description} /> */}
        <meta property="og:image" content={image} />
        <meta
          property="fb:app_id"
          content={""}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={"YopiNoji"}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
}

export default SEO;
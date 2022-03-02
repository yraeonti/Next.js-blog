import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'



export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    // console.log(postData);
    return {
      props: {
        postData
      }
    }
  }



export default function Post({ postData}) {

  return <Layout>
      <Head>
          <title>{postData ? postData.title : 'Page'}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
            {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
        </Layout>
}
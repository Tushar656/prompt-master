import Feed from '@components/Feed';
import '@styles/globals.css'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">AI Powered Promts</span>
      </h1>
      <p className="desc text-center">PromptMaster is an open source AI Prompting tool for modern tool for modern world to discover, create and share creative prompt</p>

      <Feed/>

    </section>
  )
}

export default Home;
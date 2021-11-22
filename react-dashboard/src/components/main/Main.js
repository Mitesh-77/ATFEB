import "./Main.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
const Main = () => {
    return (
        <main>
            <div className="main__container">
                <div className="main__title">
                    <img src={hello} alt="hello" />
                    <div className="main__greetings">
                        <h1>hello Market Researchers</h1>
                        <p>Welcome to Dashboard</p>
                    </div>
                </div>
                <div className="main__cards">
                    <div class="card">
                        <i className="fa fa-product-hunt fa-2x"></i>
                        <div class="card_inner">
                            <p class="text-primary-p">Number of products</p>
                            <span className="font-bold text-title">1900</span>
                        </div>
                    </div>

                    <div class="card">
                        <i className="fa fa-user fa-2x text-red"></i>
                        <div class="card_inner">
                            <p class="text-primary-p">Number of Cutomers</p>
                            <span className="font-bold text-title">900</span>
                        </div>
                    </div>
                    <div class="card">
                        <i className="fa fa-video-camera fa-2x text-yellow"></i>
                        <div class="card_inner">
                            <p class="text-primary-p">Times Of Watching</p>
                            <span className="font-bold text-title">1249</span>
                        </div>
                    </div>
                    <div class="card">
                        <i className="fa fa-thumbs-up fa-2x text-green"></i>
                        <div class="card_inner">
                            <p class="text-primary-p">Number of Likes</p>
                            <span className="font-bold text-title">10567</span>
                        </div>
                    </div>
                </div>
                <div className="charts">
                    <div className="charts__left">
                        <div className="charts__left__title">
                            <div>
                                <h1>Daily reports</h1>
                                <p>Cupertino</p>
                            </div>
                            <i className="fa fa-usd">1675</i>
                        </div>
                        <Chart />
                    </div>

                    <div className="charts__right">
                        <div className="charts__right__title">
                            <div>
                                <h1>stats reports</h1>
                                <p>Cupertino, California, USA</p>
                            </div>
                            <i className="fa fa-usd">275600</i>
                        </div>
                        <div className="charts__right__cards">
                            <div className="card1">
                                <h1>Income</h1>
                                <p>$75,300</p>
                            </div>
                            <div className="card2">
                                <h1>Sales</h1>
                                <p>$2,00,300</p>
                            </div>
                            <div className="card3">
                                <h1>Customers</h1>
                                <p>900</p>
                            </div>
                            <div className="card4">
                                <h1>Orders</h1>
                                <p>10564</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main >
    )

}
export default Main;

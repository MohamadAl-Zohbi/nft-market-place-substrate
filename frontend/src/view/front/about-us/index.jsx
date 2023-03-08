import "./style.css";
import Icon from '@img/icon.png'
import RobotOne from '@img/robot-one.png'
import RobotTwo from '@img/robot-four.png'
import RobotThree from '@img/robot-two.png'
import RobotFour from '@img/robot-three.png'

export default function AboutUsFrontPage() {
    return (
        <div id="about-us">
            <div className="we-do-section">
                <div className="we-do-section1">
                    <h4>WHAT WE DO</h4>
                    <h1>
                        We’ve got everything you need to launch and grow your business
                    </h1>
                    <hr />
                </div>

                <div className="we-do-section2">
                    <div className="we-do-with-icon">
                        <img
                            src={Icon}
                            alt="icon"
                        />
                        <div className="we-do-content">
                            <h2>Brand Identity</h2>
                            <p>
                                Nemo cupiditate ab quibusdam quaerat impedit magni. Earum
                                suscipit ipsum laudantium. Quo delectus est. Maiores voluptas ab
                                sit natus veritatis ut. Debitis nulla cumque veritatis. Sunt
                                suscipit voluptas ipsa in tempora esse soluta sint.
                            </p>
                        </div>
                    </div>
                    <div className="we-do-with-icon">
                        <img
                            src={Icon}
                            alt="icon"
                        />
                        <div className="we-do-content">
                            <h2>Illustration</h2>
                            <p>
                                Nemo cupiditate ab quibusdam quaerat impedit magni. Earum
                                suscipit ipsum laudantium. Quo delectus est. Maiores voluptas ab
                                sit natus veritatis ut. Debitis nulla cumque veritatis. Sunt
                                suscipit voluptas ipsa in tempora esse soluta sint.
                            </p>
                        </div>
                    </div>
                    <div className="we-do-with-icon">
                        <img
                            src={Icon}
                            alt="icon"
                        />
                        <div className="we-do-content">
                            <h2>Marketing</h2>
                            <p>
                                Nemo cupiditate ab quibusdam quaerat impedit magni. Earum
                                suscipit ipsum laudantium. Quo delectus est. Maiores voluptas ab
                                sit natus veritatis ut. Debitis nulla cumque veritatis. Sunt
                                suscipit voluptas ipsa in tempora esse soluta sint.
                            </p>
                        </div>
                    </div>
                    <div className="we-do-with-icon">
                        <img
                            src={Icon}
                            alt="icon"
                        />
                        <div className="we-do-content">
                            <h2>Web Design</h2>
                            <p>
                                Nemo cupiditate ab quibusdam quaerat impedit magni. Earum
                                suscipit ipsum laudantium. Quo delectus est. Maiores voluptas ab
                                sit natus veritatis ut. Debitis nulla cumque veritatis. Sunt
                                suscipit voluptas ipsa in tempora esse soluta sint.
                            </p>
                        </div>
                    </div>
                    <div className="we-do-with-icon">
                        <img
                            src={Icon}
                            alt="icon"
                        />
                        <div className="we-do-content">
                            <h2>Packaging Design</h2>
                            <p>
                                Nemo cupiditate ab quibusdam quaerat impedit magni. Earum
                                suscipit ipsum laudantium. Quo delectus est. Maiores voluptas ab
                                sit natus veritatis ut. Debitis nulla cumque veritatis. Sunt
                                suscipit voluptas ipsa in tempora esse soluta sint.
                            </p>
                        </div>
                    </div>
                    <div className="we-do-with-icon">
                        <img
                            src={Icon}
                            alt="icon"
                        />
                        <div className="we-do-content">
                            <h2>Web Development</h2>
                            <p>
                                Nemo cupiditate ab quibusdam quaerat impedit magni. Earum
                                suscipit ipsum laudantium. Quo delectus est. Maiores voluptas ab
                                sit natus veritatis ut. Debitis nulla cumque veritatis. Sunt
                                suscipit voluptas ipsa in tempora esse soluta sint.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="work-section">
                <div className="work-section1">
                    <h4>RECENT WORKS</h4>
                    <h1>We love what we do, check out some of our latest works</h1>
                    <hr />
                </div>
            </div>

            <div className="work-section2">
                <img
                    src={RobotFour}
                    alt="icon"
                />
                <img
                    src={RobotOne}
                    alt="icon"
                />
                <img
                    src={RobotTwo}
                    alt="icon"
                />
                <img
                    src={RobotThree}
                    alt="icon"
                />
            </div>
        </div>
    )
}

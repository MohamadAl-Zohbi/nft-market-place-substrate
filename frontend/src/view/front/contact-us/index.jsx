import "./style.css";
export default function ContactUsFrontPage() {

    return (
        <div id="contact-us">
            <form className="contact-us-page">
                <h1>Contact Us</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut laboresed do eiusmod tempor incididunt ut
                    labore.
                </p>

                <div className="contact-us-name">
                    <label for="Name"></label>
                    <input
                        type="name"
                        placeholder="Your Name"
                        name="name"
                        id="name_input"
                        required
                    />
                </div>

                <div className="contact-us-email">
                    <label for="email"></label>
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email"
                        id="email_input"
                        required
                    />
                </div>

                <div className="contact-us-message">
                    <label for="message"></label>
                    <textarea
                        name="message"
                        placeholder="Your message"
                        id="message_input"
                        cols="30"
                        rows="5"
                        required
                    ></textarea>
                </div>

                <div className="contact-us-submit">
                    <input
                        type="submit"
                        value="Send Message"
                        id="form_button-contactus"
                    />
                </div>
            </form>
        </div>
    )
}
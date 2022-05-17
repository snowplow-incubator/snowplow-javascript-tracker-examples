import { useLocationChange } from '../tracker';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { enableFormTracking } from '@snowplow/browser-plugin-form-tracking';

export default function Form() {
    useLocationChange();
    useEffect(() => {
        enableFormTracking({
            options: {
                forms: { allowlist: ['formy-mcformface'] },
                events: ['submit_form', 'change_form', 'focus_form']
            },
        });
    });

    return (
        <div className="App">
            <h1>Form tracking demo</h1>

            <p>
                <Link to="/">Go back</Link>
            </p>

            <form id="myForm" className="formy-mcformface" onSubmit={() => alert('Submitted')}>
                <fieldset id="fields">
                    <legend>Personal Info:</legend>
                    <label htmlFor="fname">First name:</label><br />
                    <input type="text" id="fname" name="fname" placeholder="John" className="test" /><br />
                    <label htmlFor="lname">Last name:</label><br />
                    <input type="text" id="lname" name="lname" placeholder="Doe" /><br /><br />
                    <input type="radio" id="bike" name="vehicle" placeholder="Bike" />
                    <label htmlFor="bike"> I have a bike</label><br />
                </fieldset>
                <label htmlFor="cars">Choose a car:</label>
                <select id="cars" name="cars">
                    <option id="volvo" value="volvo">Volvo</option>
                    <option id="saab" value="saab">Saab</option>
                </select>
                <br />
                <label htmlFor="message">Enter a message:</label><br />
                <textarea id="message" name="message" rows="10" cols="30" defaultValue={'This is a message'}></textarea><br />
                <input type="checkbox" id="terms" name="terms" value="agree" />
                <label htmlFor="terms"> Agree to terms</label><br />
                <input type="submit" value="Submit" id="submit" />
            </form>

            <h3>Untracked form</h3>

            <form id="otherForm" className="forman" onSubmit={() => alert('Submitted')}>
                <fieldset id="fields">
                    <legend>Personal Info:</legend>
                    <label htmlFor="fname">First name:</label><br />
                    <input type="text" id="fname" name="fname" placeholder="John" className="test" /><br />
                </fieldset>
                <input type="submit" value="Submit" id="submit" />
            </form>
        </div>
    );
}

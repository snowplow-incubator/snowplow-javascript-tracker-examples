import { useLocationChange } from '../tracker';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { enableFormTracking } from '@snowplow/browser-plugin-form-tracking';

export default function IframeForm() {
    useLocationChange();

    useEffect(() => {
        const formHtml = '<form><input type="text" name="first_name"><br><input type="submit" value="Submit"></form>';

        let iframe = document.getElementById('form_iframe');
        let iframeDocument = iframe.contentWindow.document.open();
        iframeDocument.open();
        iframeDocument.write(formHtml);
        iframeDocument.close();

        let forms = iframe.contentWindow.document.getElementsByTagName('form');
        enableFormTracking({
            options: {
                forms: forms
            },
        });
    });

    return (
        <div className="App">
            <h1>Form tracking demo</h1>

            <p>
                <Link to="/">Go back</Link>
            </p>

            <iframe id="form_iframe" title="form_iframe" style={{width: 500, height: 500}}></iframe>
        </div>
    );
}

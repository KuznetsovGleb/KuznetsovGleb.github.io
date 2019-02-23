import component from './simple-components/dom';
import './theme/main.css';
// import 'style-loader!css-loader!./theme/main.css';


let demoComponent = component();

document.body.appendChild(demoComponent);

if (module.hot) {
    module.hot.accept('./simple-components/dom', () => {
        const nextComponent = component();

        document.body.replaceChild(nextComponent, demoComponent);

        demoComponent = nextComponent;
    });
}
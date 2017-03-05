/**
 * Main flow file
 **/
import {eventBus, events} from './modules/core/lib/EventBus';

import site from './modules/core/site/Site';

import core from './modules/core/_initialize';
import opal from './modules/opal/_initialize';
import samil from './modules/samil/_initialize';
import sidow from './modules/sidow/_initialize';
import vedas from './modules/vedas/_initialize';

const Main = {

    startModules() {
        core.start();

        eventBus.addListener(events.GLOBAL_EVENT.CORE_MODULE_LOADED, () => {
            opal.start();

            sidow.start();
            samil.start();
            vedas.start();

            eventBus.send(events.GLOBAL_EVENT.ALL_MODULES_LOADED, {});
        });
    },

    start() {
        eventBus.addListener(events.SIDEBAR.SIDEBAR_READY, () => {
            eventBus.send(events.GLOBAL_EVENT.CORE_MODULE_LOADED, {});
        });

        site.start();
    },

    startDeveloperMode() {
        eventBus.addListener(events.SIDEBAR.SIDEBAR_READY, () => {
            eventBus.send(events.GLOBAL_EVENT.CORE_MODULE_LOADED, {});
        });

        site.startDeveloperMode();
    }

};

export default Main;

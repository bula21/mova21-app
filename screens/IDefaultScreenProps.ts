import {WithTranslation} from "react-i18next";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";

export default interface IDefaultScreenProps extends WithTranslation {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

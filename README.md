# Portal View
[link](https://pv.nextwing.me/)
>Dynamic bookmark managing app
- Visualize how often user visited the webiste
    - Warning for website where user has not visited recently
- One click for visiting multiple websites (Chrome)

---
## Focused (compared to past projects)
- Used Typescirpt on entire app 
- Used Sass on entire app 
    - Moved from Styled Components
        - Sass Module  
    - Made mixins for Dark Mode, Colors of diverse hue 
- Used Firebase 
- Systematize Components (UI)
    - Nav, Page, Modal, Notification


## Should Be Improved
- Semantic HTML
- Better saga coding for rendering/using firebase less
- More complicate UI
- Automatic testing


---

## System
- [Components (UI)](#components)
- [Styles](#styles)
- [State Management](#state-management)
- [Language](#language)
- [Icons](#icons)

---

### Components
[back to to top](#system)
> = Nav + Page + Modal + Notification + Action
- Nav
    - stay on top
    - hide at certain pages like 'LogIn', 'SignUp', ...
- Page
    - content which appear based on routes
    - LogIn, Home, ...
    ```javascript
        <Switch>
            <Route exact path="/" >
                <Home />
            </Route>

            <Route path="/log-in" >
                <LogIn />
            </Route>

            <Route path="/sign-up" >
                <SignUp />
            </Route>

            <Route >
                <NotFound />
            </Route>
          </Switch>
    ```
- Modal
    - box shows at the middle of screen for work like 'create portal'
    - designed thinking experince on mobile
    ```javascript
        return (        
        <>
            {showingSetting && <Setting />}
            {showingMyProfile && <MyProfile />}
            {showingCreatingPortal && <CreatingPortal />}
            {showingEditingPortal && <EditingPortal />}

            {showingAddingPortalToStack && <AddingPortalToStack />}
            {showingCreatingStack && <CreatingStack />}
            {showingEditingStack && <EditingStack />}


            {showingSearching && <Searching />}
        </>
    );
    ```
- Notification
    - banner shows shorty for notificate success, hint, warning, error
    - use 4 color palettes
    - work well with multi-language
    ```javascript
        function* addDeleteBanner(action: actionsNotification.type__ADD_DELETE_BANNER) {
            
            const listBannerPrevious: Banner[] =  yield select( (state:StateRoot) => state.notification.listBanner ); 
                
            const id = uuidv4();
            
            const codeSituation: string = action.payload.codeSituation;
            
            let kindSituation: actionsNotification.KindSituation = 'warning';
            if (codeSituation.match(/__S$/)){
                kindSituation = 'success';
            }
            else if (codeSituation.match(/__H$/)){
                kindSituation = 'hint';
            }
            else if (codeSituation.match(/__W$/)){
                kindSituation = 'warning';
            }
            else if (codeSituation.match(/__E$/)){
                kindSituation = 'error';
            }
            
            const idMessage: string = `Notification.${codeSituation}`;
            
            let levelTimeBanner:actionsNotification.LevelTimeBanner = 'normal';
            
            if ( kindSituation === 'success'){
            levelTimeBanner = 'short';
            }
            else if ( kindSituation === 'hint'){
            levelTimeBanner = 'normal';
            }
            else if ( kindSituation === 'error'){
            levelTimeBanner = 'long';
            }
            else if ( kindSituation === 'warning'){
            levelTimeBanner = 'normal';
            }
            
            let msTime: actionsNotification.MsTimeBanner = actionsNotification.MsTimeBanner[levelTimeBanner];
            
            const bannerAdding = {
            id: id,  
            codeSituation: codeSituation, 
            kindSituation: kindSituation,
            idMessage: idMessage,
            msTime: msTime 
            }
            
            const listBannerNew = [bannerAdding, ...listBannerPrevious];
                
            yield put( actionsNotification.return__REPLACE({
                listKey: ['listBanner'],
                replacement: listBannerNew
            }) );
            
            yield delay( msTime );

            yield put( actionsNotification.return__DELETE_BANNER({
                id: id
            }) );
        }
    ```
- Action
    - small box which is for simple works like sharing
    - made only design for now

---

### Styles
[back to to top](#system)
> Utilize Sass for Dark mode and module coding
- reset.css, basic styles for popular tags
- made mixins for getting color value from map(using key) and apply it with class for theme name 
    ```Scss
        @mixin color-each-theme($property, $key-color, $opacity: 1, $is-module: true) {

        @each $name-theme in $list-name-theme {
            $color-1: map-get-deep(
                $map: $palette, 
                $listKey: ($name-theme, $key-color)
            );

            $color: $color-1;
            @if ($opacity != 1){
                $color: rgba($color-1, $opacity);
            }

            @if ($name-theme == $name-theme-default) {
                #{$property}: $color;
            }

            @if ($is-module == true) {
                :global(.theme----#{$name-theme}) & {
                    #{$property}: $color;
                }
            }
            @else {
                .theme----#{$name-theme} & {
                    #{$property}: $color;
                }    
            }
        }
    }
    ```
---
### State Management
[back to to top](#system)
> Redux, immer, Redux saga
- made useful action 
    ```typescript
    export const name__REPLACE: string = `status/REPLACE`;    
    interface Payload__REPLACE {
        listKey: (string | number)[];
        replacement: any;
    }
    export const return__REPLACE = (payload: Payload__REPLACE) => {    
        return {
            type: name__REPLACE,
            payload: payload
        }
    };
    export type type__REPLACE = ReturnType<typeof return__REPLACE>;
    ```
- divided reducers
    - auth
    - notification
    - portal
    - stack
    - status
    ```typescript
    const stateInitial = { // status

        loading: {
            user: false,
            listPortal: false,
            listStack: false
        },
        ready: {
            user: false,
            listPortal: false,
            listStack: false
        },
        current: {
            language: '',   // en, ko, ja    , it should be blank at first check cookie first (call DETECT_LANGUAGE)
            theme: {
            option: 'always-light',
            name: 'light'
            },
            portal: {
                open: '',
                editing: '',
                addingToStack: '',
                sorting: {
                    property: 'hp' as 'hp' | 'dateVisited', 
                    direction: {
                        hp: 'ascending' as 'ascending' | 'descending', 
                        dateVisited: 'ascending' as 'ascending' | 'descending', 
                    }
                },
                hiding: {
                    inStacks: false,
                },
            },
            stack: {
                open: '',
                editing: '',
                sorting: {
                    property: 'name' as 'name' | 'dateVisited', 
                    direction: {
                        name: 'ascending' as 'ascending' | 'descending', 
                        dateVisited: 'ascending' as 'ascending' | 'descending', 
                    }
                }
            },
        },
        showing: {
            nav: false,
            modal: {
                setting: false,
                myProfile: false,
                creatingPortal: false,
                editingPortal: false,
                    
                addingPortalToStack: false,
                creatingStack: false,
                editingStack: false,

                searching: false,
            }
        }
    };
    ```

---
### Language 
[back to to top](#system)
> react-intl
- work well with Notification
    ```typescript
        const intl = useIntl();
        //
        <input 
            type='password'
            placeholder={intl.formatMessage({ id: 'Page.LogIn_Password'})}
            value={inputPassword.value}
            required
            onChange={inputPassword.onChange}
            onKeyPress={onKeyPress_LogIn}
        /> 
        //
        <FormattedMessage id={`Notification.${codeSituationPassword}`}/>
    ```

    ```
    // en.json // there is ko.json too
    {
        "Blank": "",

        "Nav.Home": "Home",
        "Nav.Setting": "Setting",
            
        "Nav.NameApp": "Portal View",
        
        "Nav.LogIn": "Log In",
        "Nav.SignUp": "Sign Up",
        
        "Nav.System": "System",   
        "Nav.System_State": "State",
        "Nav.System_Styles": "Styles",
        "Nav.System_Language": "Language",
        "Nav.Diary": "Diary",
        
        
        "Modal.Create": "Create",
        "Modal.Delete": "Delete",
        "Modal.Update": "Update",

        "Modal.Setting_Title": "Setting",
        "Modal.Setting_Theme": "Theme",
        "Modal.Setting_Language": "Language",
        "Modal.Setting_LogOut": "Log Out",
        
        "Modal.MyProfile_Title": "My Profile",
        "Modal.MyProfile_EmailAddress": "Email Address",
        "Modal.MyProfile_Name": "Name",
        "Modal.MyProfile_Photo": "Photo",
        "Modal.MyProfile_Update": "Update",

        ... 
        "Global.Portal": "Portal",
        "Global.Stack": "Stack",
        "Global.Name": "Name",
        "Global.Add": "Add",
        "Global.Create": "Create",
        "Global.Delete": "Delete",
        "Global.Update": "Update",
        "Global.Search": "Search",

        "Notification.Test1__S": "Succuessfully tested 1 !",
        "Notification.Test2__H": "Succuessfully tested 2 !",
        "Notification.NotLoggedIn__E": "You should log in first",
        "Notification.UnknownError__E": "An unknown error has occurred",

        "Notification.LogIn_UnknownError__E": "An unknown error has occurred",
        "Notification.LogIn_UserNotFound__E": "No user was found from this email address",
        "Notification.LogIn_UserDisabled__E": "This user has been disabled",

        "Notification.LogIn_NoEmail__E": "Please enter email address",
        "Notification.LogIn_InvalidEmail__E": "The email address is not valid",
        "Notification.LogIn_NoPassword__E": "Please enter password",
        "Notification.LogIn_WrongPassword__E": "Password is wrong, or you should use the social service you have already registered",

        "Notification.LogInGoogle_UnknownError__E": "An unknown error has occurred",
        "Notification.LogInGithub_UnknownError__E": "An unknown error has occurred",

        ...
        "Notification.CreateStack_Succeeded__S": "Successfully created stack!",
        "Notification.CreateStack_UnknownError__E": "Failed to create the stack",
        "Notification.GetListStack_UnknownError__E": "Failed to get stacks",
        "Notification.VisitStack_UnknownError__E": "Failed to update the some portals which you visited",
        "Notification.UpdateStack_Succeeded__S": "Successfully updated stack!",
        "Notification.UpdateStack_UnknownError__E": "Failed to update the stack",
        "Notification.DeleteStack_Succeeded__S": "Successfully deleted stack!",
        "Notification.DeleteStack_UnknownError__E": "Failed to delete the stack",

        "Page.Home_Welcome": "Welcome!",
        "Page.LogIn_LogIn": "LogIn",
        "Page.LogIn_EmailAddress": "Email Address",
        "Page.LogIn_Password": "Password",
        "Page.LogIn_SignUp": "Sign Up",

        "Page.SignUp_PasswordAgain": "Password Again",

        "Page.Home_ConfirmDeletingPortal": "Are you sure you want to delete this portal?"
    }
    ```
---
### Icons
[back to to top](#system)
> svg components from font awesome svgs
    ```javascript
    import React from "react";

    type PropsIcon = {
        className?: string;
        kind?: 'regular' | 'solid' | 'light';  // thin, light, regular, solid, ...
    } & typeof propsDefault;

    const propsDefault = {  
        className: ''
    };

    // Hide
    const Icon = ({ className, kind }: PropsIcon) => {
    return (
        <div className={`${className} icon`} >
        <svg
            width="100%"
            height="100%"
            fill="currentColor"
            className=""
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
        >
        {(!kind || kind === 'regular') && 
    <path fill="currentColor" d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"></path>
        }
        {(kind === 'light') && 
    <path fill="currentColor" d="M637 485.25L23 1.75A8 8 0 0 0 11.76 3l-10 12.51A8 8 0 0 0 3 26.75l614 483.5a8 8 0 0 0 11.25-1.25l10-12.51a8 8 0 0 0-1.25-11.24zM320 96a128.14 128.14 0 0 1 128 128c0 21.62-5.9 41.69-15.4 59.57l25.45 20C471.65 280.09 480 253.14 480 224c0-36.83-12.91-70.31-33.78-97.33A294.88 294.88 0 0 1 576.05 256a299.73 299.73 0 0 1-67.77 87.16l25.32 19.94c28.47-26.28 52.87-57.26 70.93-92.51a32.35 32.35 0 0 0 0-29.19C550.3 135.59 442.94 64 320 64a311.23 311.23 0 0 0-130.12 28.43l45.77 36C258.24 108.52 287.56 96 320 96zm60.86 146.83A63.15 63.15 0 0 0 320 160c-1 0-1.89.24-2.85.29a45.11 45.11 0 0 1-.24 32.19zm-217.62-49.16A154.29 154.29 0 0 0 160 224a159.39 159.39 0 0 0 226.27 145.29L356.69 346c-11.7 3.53-23.85 6-36.68 6A128.15 128.15 0 0 1 192 224c0-2.44.59-4.72.72-7.12zM320 416c-107.36 0-205.47-61.31-256-160 17.43-34 41.09-62.72 68.31-86.72l-25.86-20.37c-28.48 26.28-52.87 57.25-70.93 92.5a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448a311.25 311.25 0 0 0 130.12-28.43l-29.25-23C389.06 408.84 355.15 416 320 416z"></path>
        }
        {(kind === 'solid') && 
    <path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
        }
            
        </svg>
        
        </div>
    );
    };
    Icon.defaultProps = propsDefault;
    //

    export default Icon;

    ```

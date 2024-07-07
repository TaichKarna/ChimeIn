import { useAppSelector } from '../redux/hooks/hook';

type ThemeProviderProps = {
    children : React.ReactNode;
}


export default function ThemeProvider({children} : ThemeProviderProps){
    const { theme }  = useAppSelector(state => state.theme)

    return (
        <div className={`${theme}`}>
          <div className='dark:bg-neutralActive dark:text-neutralOffWhite text-neutralActive bg-neutralWhite'>
            {children}
          </div>
        </div>
    )

}
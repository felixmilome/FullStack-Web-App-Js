import FooterRow from './FooterRow';
import {   
    UsersIcon, 
    RssIcon,
    VideoCameraIcon, 
    MusicNoteIcon, 
    BookOpenIcon, 
    ShoppingBagIcon } from '@heroicons/react/outline'

function Footer(){
return (
    <div className=" fixed inset-x-0 bottom-0  border-t-2 shadow-xl z-50 bg-gray-200 border-t-2 border-gray-300 flex items-center  justify-around">

    <FooterRow Icon = {UsersIcon} title ="Socializing"/>
    <FooterRow Icon = {RssIcon} title="Blogging"/>
    <FooterRow Icon = {VideoCameraIcon}title="Watching"/> 
    <FooterRow Icon = {MusicNoteIcon}title="Listening"/>
    <FooterRow Icon = {BookOpenIcon} title="Reading"/> 
    <FooterRow Icon = {ShoppingBagIcon} title="Shopping"/> 

</div>
);
}
export default Footer;
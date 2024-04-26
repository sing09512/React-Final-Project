import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react";
import { addDays, format, setDate } from "date-fns";
import { Calendar as CalendarIcon, Search, Users, Plus, Minus, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CommandList } from "cmdk";
import { useNavigate } from "react-router-dom";

const countriesList = [
  {
    country_code: "af",
    country_name: "Afghanistan",
  },
  {
    country_code: "al",
    country_name: "Albania",
  },
  {
    country_code: "dz",
    country_name: "Algeria",
  },
  {
    country_code: "as",
    country_name: "American Samoa",
  },
  {
    country_code: "ad",
    country_name: "Andorra",
  },
  {
    country_code: "ao",
    country_name: "Angola",
  },
  {
    country_code: "ai",
    country_name: "Anguilla",
  },
  {
    country_code: "aq",
    country_name: "Antarctica",
  },
  {
    country_code: "ag",
    country_name: "Antigua and Barbuda",
  },
  {
    country_code: "ar",
    country_name: "Argentina",
  },
  {
    country_code: "am",
    country_name: "Armenia",
  },
  {
    country_code: "aw",
    country_name: "Aruba",
  },
  {
    country_code: "au",
    country_name: "Australia",
  },
  {
    country_code: "at",
    country_name: "Austria",
  },
  {
    country_code: "az",
    country_name: "Azerbaijan",
  },
  {
    country_code: "bs",
    country_name: "Bahamas",
  },
  {
    country_code: "bh",
    country_name: "Bahrain",
  },
  {
    country_code: "bd",
    country_name: "Bangladesh",
  },
  {
    country_code: "bb",
    country_name: "Barbados",
  },
  {
    country_code: "by",
    country_name: "Belarus",
  },
  {
    country_code: "be",
    country_name: "Belgium",
  },
  {
    country_code: "bz",
    country_name: "Belize",
  },
  {
    country_code: "bj",
    country_name: "Benin",
  },
  {
    country_code: "bm",
    country_name: "Bermuda",
  },
  {
    country_code: "bt",
    country_name: "Bhutan",
  },
  {
    country_code: "bo",
    country_name: "Bolivia",
  },
  {
    country_code: "ba",
    country_name: "Bosnia and Herzegovina",
  },
  {
    country_code: "bw",
    country_name: "Botswana",
  },
  {
    country_code: "bv",
    country_name: "Bouvet Island",
  },
  {
    country_code: "br",
    country_name: "Brazil",
  },
  {
    country_code: "io",
    country_name: "British Indian Ocean Territory",
  },
  {
    country_code: "bn",
    country_name: "Brunei Darussalam",
  },
  {
    country_code: "bg",
    country_name: "Bulgaria",
  },
  {
    country_code: "bf",
    country_name: "Burkina Faso",
  },
  {
    country_code: "bi",
    country_name: "Burundi",
  },
  {
    country_code: "kh",
    country_name: "Cambodia",
  },
  {
    country_code: "cm",
    country_name: "Cameroon",
  },
  {
    country_code: "ca",
    country_name: "Canada",
  },
  {
    country_code: "cv",
    country_name: "Cape Verde",
  },
  {
    country_code: "ky",
    country_name: "Cayman Islands",
  },
  {
    country_code: "cf",
    country_name: "Central African Republic",
  },
  {
    country_code: "td",
    country_name: "Chad",
  },
  {
    country_code: "cl",
    country_name: "Chile",
  },
  {
    country_code: "cn",
    country_name: "China",
  },
  {
    country_code: "cx",
    country_name: "Christmas Island",
  },
  {
    country_code: "cc",
    country_name: "Cocos (Keeling) Islands",
  },
  {
    country_code: "co",
    country_name: "Colombia",
  },
  {
    country_code: "km",
    country_name: "Comoros",
  },
  {
    country_code: "cg",
    country_name: "Congo",
  },
  {
    country_code: "cd",
    country_name: "Congo, the Democratic Republic of the",
  },
  {
    country_code: "ck",
    country_name: "Cook Islands",
  },
  {
    country_code: "cr",
    country_name: "Costa Rica",
  },
  {
    country_code: "ci",
    country_name: "Cote D'ivoire",
  },
  {
    country_code: "hr",
    country_name: "Croatia",
  },
  {
    country_code: "cu",
    country_name: "Cuba",
  },
  {
    country_code: "cy",
    country_name: "Cyprus",
  },
  {
    country_code: "cz",
    country_name: "Czech Republic",
  },
  {
    country_code: "dk",
    country_name: "Denmark",
  },
  {
    country_code: "dj",
    country_name: "Djibouti",
  },
  {
    country_code: "dm",
    country_name: "Dominica",
  },
  {
    country_code: "do",
    country_name: "Dominican Republic",
  },
  {
    country_code: "ec",
    country_name: "Ecuador",
  },
  {
    country_code: "eg",
    country_name: "Egypt",
  },
  {
    country_code: "sv",
    country_name: "El Salvador",
  },
  {
    country_code: "gq",
    country_name: "Equatorial Guinea",
  },
  {
    country_code: "er",
    country_name: "Eritrea",
  },
  {
    country_code: "ee",
    country_name: "Estonia",
  },
  {
    country_code: "et",
    country_name: "Ethiopia",
  },
  {
    country_code: "fk",
    country_name: "Falkland Islands (Malvinas)",
  },
  {
    country_code: "fo",
    country_name: "Faroe Islands",
  },
  {
    country_code: "fj",
    country_name: "Fiji",
  },
  {
    country_code: "fi",
    country_name: "Finland",
  },
  {
    country_code: "fr",
    country_name: "France",
  },
  {
    country_code: "gf",
    country_name: "French Guiana",
  },
  {
    country_code: "pf",
    country_name: "French Polynesia",
  },
  {
    country_code: "tf",
    country_name: "French Southern Territories",
  },
  {
    country_code: "ga",
    country_name: "Gabon",
  },
  {
    country_code: "gm",
    country_name: "Gambia",
  },
  {
    country_code: "ge",
    country_name: "Georgia",
  },
  {
    country_code: "de",
    country_name: "Germany",
  },
  {
    country_code: "gh",
    country_name: "Ghana",
  },
  {
    country_code: "gi",
    country_name: "Gibraltar",
  },
  {
    country_code: "gr",
    country_name: "Greece",
  },
  {
    country_code: "gl",
    country_name: "Greenland",
  },
  {
    country_code: "gd",
    country_name: "Grenada",
  },
  {
    country_code: "gp",
    country_name: "Guadeloupe",
  },
  {
    country_code: "gu",
    country_name: "Guam",
  },
  {
    country_code: "gt",
    country_name: "Guatemala",
  },
  {
    country_code: "gn",
    country_name: "Guinea",
  },
  {
    country_code: "gw",
    country_name: "Guinea-Bissau",
  },
  {
    country_code: "gy",
    country_name: "Guyana",
  },
  {
    country_code: "ht",
    country_name: "Haiti",
  },
  {
    country_code: "hm",
    country_name: "Heard Island and Mcdonald Islands",
  },
  {
    country_code: "va",
    country_name: "Holy See (Vatican City State)",
  },
  {
    country_code: "hn",
    country_name: "Honduras",
  },
  {
    country_code: "hk",
    country_name: "Hong Kong",
  },
  {
    country_code: "hu",
    country_name: "Hungary",
  },
  {
    country_code: "is",
    country_name: "Iceland",
  },
  {
    country_code: "in",
    country_name: "India",
  },
  {
    country_code: "id",
    country_name: "Indonesia",
  },
  {
    country_code: "ir",
    country_name: "Iran, Islamic Republic of",
  },
  {
    country_code: "iq",
    country_name: "Iraq",
  },
  {
    country_code: "ie",
    country_name: "Ireland",
  },
  {
    country_code: "il",
    country_name: "Israel",
  },
  {
    country_code: "it",
    country_name: "Italy",
  },
  {
    country_code: "jm",
    country_name: "Jamaica",
  },
  {
    country_code: "jp",
    country_name: "Japan",
  },
  {
    country_code: "jo",
    country_name: "Jordan",
  },
  {
    country_code: "kz",
    country_name: "Kazakhstan",
  },
  {
    country_code: "ke",
    country_name: "Kenya",
  },
  {
    country_code: "ki",
    country_name: "Kiribati",
  },
  {
    country_code: "kp",
    country_name: "Korea, Democratic People's Republic of",
  },
  {
    country_code: "kr",
    country_name: "Korea, Republic of",
  },
  {
    country_code: "kw",
    country_name: "Kuwait",
  },
  {
    country_code: "kg",
    country_name: "Kyrgyzstan",
  },
  {
    country_code: "la",
    country_name: "Lao People's Democratic Republic",
  },
  {
    country_code: "lv",
    country_name: "Latvia",
  },
  {
    country_code: "lb",
    country_name: "Lebanon",
  },
  {
    country_code: "ls",
    country_name: "Lesotho",
  },
  {
    country_code: "lr",
    country_name: "Liberia",
  },
  {
    country_code: "ly",
    country_name: "Libyan Arab Jamahiriya",
  },
  {
    country_code: "li",
    country_name: "Liechtenstein",
  },
  {
    country_code: "lt",
    country_name: "Lithuania",
  },
  {
    country_code: "lu",
    country_name: "Luxembourg",
  },
  {
    country_code: "mo",
    country_name: "Macao",
  },
  {
    country_code: "mk",
    country_name: "Macedonia, the Former Yugosalv Republic of",
  },
  {
    country_code: "mg",
    country_name: "Madagascar",
  },
  {
    country_code: "mw",
    country_name: "Malawi",
  },
  {
    country_code: "my",
    country_name: "Malaysia",
  },
  {
    country_code: "mv",
    country_name: "Maldives",
  },
  {
    country_code: "ml",
    country_name: "Mali",
  },
  {
    country_code: "mt",
    country_name: "Malta",
  },
  {
    country_code: "mh",
    country_name: "Marshall Islands",
  },
  {
    country_code: "mq",
    country_name: "Martinique",
  },
  {
    country_code: "mr",
    country_name: "Mauritania",
  },
  {
    country_code: "mu",
    country_name: "Mauritius",
  },
  {
    country_code: "yt",
    country_name: "Mayotte",
  },
  {
    country_code: "mx",
    country_name: "Mexico",
  },
  {
    country_code: "fm",
    country_name: "Micronesia, Federated States of",
  },
  {
    country_code: "md",
    country_name: "Moldova, Republic of",
  },
  {
    country_code: "mc",
    country_name: "Monaco",
  },
  {
    country_code: "mn",
    country_name: "Mongolia",
  },
  {
    country_code: "ms",
    country_name: "Montserrat",
  },
  {
    country_code: "ma",
    country_name: "Morocco",
  },
  {
    country_code: "mz",
    country_name: "Mozambique",
  },
  {
    country_code: "mm",
    country_name: "Myanmar",
  },
  {
    country_code: "na",
    country_name: "Namibia",
  },
  {
    country_code: "nr",
    country_name: "Nauru",
  },
  {
    country_code: "np",
    country_name: "Nepal",
  },
  {
    country_code: "nl",
    country_name: "Netherlands",
  },
  {
    country_code: "an",
    country_name: "Netherlands Antilles",
  },
  {
    country_code: "nc",
    country_name: "New Caledonia",
  },
  {
    country_code: "nz",
    country_name: "New Zealand",
  },
  {
    country_code: "ni",
    country_name: "Nicaragua",
  },
  {
    country_code: "ne",
    country_name: "Niger",
  },
  {
    country_code: "ng",
    country_name: "Nigeria",
  },
  {
    country_code: "nu",
    country_name: "Niue",
  },
  {
    country_code: "nf",
    country_name: "Norfolk Island",
  },
  {
    country_code: "mp",
    country_name: "Northern Mariana Islands",
  },
  {
    country_code: "no",
    country_name: "Norway",
  },
  {
    country_code: "om",
    country_name: "Oman",
  },
  {
    country_code: "pk",
    country_name: "Pakistan",
  },
  {
    country_code: "pw",
    country_name: "Palau",
  },
  {
    country_code: "ps",
    country_name: "Palestinian Territory, Occupied",
  },
  {
    country_code: "pa",
    country_name: "Panama",
  },
  {
    country_code: "pg",
    country_name: "Papua New Guinea",
  },
  {
    country_code: "py",
    country_name: "Paraguay",
  },
  {
    country_code: "pe",
    country_name: "Peru",
  },
  {
    country_code: "ph",
    country_name: "Philippines",
  },
  {
    country_code: "pn",
    country_name: "Pitcairn",
  },
  {
    country_code: "pl",
    country_name: "Poland",
  },
  {
    country_code: "pt",
    country_name: "Portugal",
  },
  {
    country_code: "pr",
    country_name: "Puerto Rico",
  },
  {
    country_code: "qa",
    country_name: "Qatar",
  },
  {
    country_code: "re",
    country_name: "Reunion",
  },
  {
    country_code: "ro",
    country_name: "Romania",
  },
  {
    country_code: "ru",
    country_name: "Russian Federation",
  },
  {
    country_code: "rw",
    country_name: "Rwanda",
  },
  {
    country_code: "sh",
    country_name: "Saint Helena",
  },
  {
    country_code: "kn",
    country_name: "Saint Kitts and Nevis",
  },
  {
    country_code: "lc",
    country_name: "Saint Lucia",
  },
  {
    country_code: "pm",
    country_name: "Saint Pierre and Miquelon",
  },
  {
    country_code: "vc",
    country_name: "Saint Vincent and the Grenadines",
  },
  {
    country_code: "ws",
    country_name: "Samoa",
  },
  {
    country_code: "sm",
    country_name: "San Marino",
  },
  {
    country_code: "st",
    country_name: "Sao Tome and Principe",
  },
  {
    country_code: "sa",
    country_name: "Saudi Arabia",
  },
  {
    country_code: "sn",
    country_name: "Senegal",
  },
  {
    country_code: "rs",
    country_name: "Serbia and Montenegro",
  },
  {
    country_code: "sc",
    country_name: "Seychelles",
  },
  {
    country_code: "sl",
    country_name: "Sierra Leone",
  },
  {
    country_code: "sg",
    country_name: "Singapore",
  },
  {
    country_code: "sk",
    country_name: "Slovakia",
  },
  {
    country_code: "si",
    country_name: "Slovenia",
  },
  {
    country_code: "sb",
    country_name: "Solomon Islands",
  },
  {
    country_code: "so",
    country_name: "Somalia",
  },
  {
    country_code: "za",
    country_name: "South Africa",
  },
  {
    country_code: "gs",
    country_name: "South Georgia and the South Sandwich Islands",
  },
  {
    country_code: "es",
    country_name: "Spain",
  },
  {
    country_code: "lk",
    country_name: "Sri Lanka",
  },
  {
    country_code: "sd",
    country_name: "Sudan",
  },
  {
    country_code: "sr",
    country_name: "Suriname",
  },
  {
    country_code: "sj",
    country_name: "Svalbard and Jan Mayen",
  },
  {
    country_code: "sz",
    country_name: "Swaziland",
  },
  {
    country_code: "se",
    country_name: "Sweden",
  },
  {
    country_code: "ch",
    country_name: "Switzerland",
  },
  {
    country_code: "sy",
    country_name: "Syrian Arab Republic",
  },
  {
    country_code: "tw",
    country_name: "Taiwan",
  },
  {
    country_code: "tj",
    country_name: "Tajikistan",
  },
  {
    country_code: "tz",
    country_name: "Tanzania, United Republic of",
  },
  {
    country_code: "th",
    country_name: "Thailand",
  },
  {
    country_code: "tl",
    country_name: "Timor-Leste",
  },
  {
    country_code: "tg",
    country_name: "Togo",
  },
  {
    country_code: "tk",
    country_name: "Tokelau",
  },
  {
    country_code: "to",
    country_name: "Tonga",
  },
  {
    country_code: "tt",
    country_name: "Trinidad and Tobago",
  },
  {
    country_code: "tn",
    country_name: "Tunisia",
  },
  {
    country_code: "tr",
    country_name: "Turkey",
  },
  {
    country_code: "tm",
    country_name: "Turkmenistan",
  },
  {
    country_code: "tc",
    country_name: "Turks and Caicos Islands",
  },
  {
    country_code: "tv",
    country_name: "Tuvalu",
  },
  {
    country_code: "ug",
    country_name: "Uganda",
  },
  {
    country_code: "ua",
    country_name: "Ukraine",
  },
  {
    country_code: "ae",
    country_name: "United Arab Emirates",
  },
  {
    country_code: "gb",
    country_name: "United Kingdom",
  },
  {
    country_code: "us",
    country_name: "United States",
  },
  {
    country_code: "um",
    country_name: "United States Minor Outlying Islands",
  },
  {
    country_code: "uy",
    country_name: "Uruguay",
  },
  {
    country_code: "uz",
    country_name: "Uzbekistan",
  },
  {
    country_code: "vu",
    country_name: "Vanuatu",
  },
  {
    country_code: "ve",
    country_name: "Venezuela",
  },
  {
    country_code: "vn",
    country_name: "Viet Nam",
  },
  {
    country_code: "vg",
    country_name: "Virgin Islands, British",
  },
  {
    country_code: "vi",
    country_name: "Virgin Islands, U.S.",
  },
  {
    country_code: "wf",
    country_name: "Wallis and Futuna",
  },
  {
    country_code: "eh",
    country_name: "Western Sahara",
  },
  {
    country_code: "ye",
    country_name: "Yemen",
  },
  {
    country_code: "zm",
    country_name: "Zambia",
  },
  {
    country_code: "zw",
    country_name: "Zimbabwe",
  },
];

function InputDemo({ params, setParams }) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search city, hotel..."
        className="pl-8 w-full md:w-64"
        value={params}
        onChange={(e) => setParams(`${e.target.value}`)}
        autoFocus="autoFocus"
      />
    </div>
  );
}
function CountryComboBox({ value, setValue }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} className="">
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between md:w-48">
          {value
            ? countriesList.find((framework) => framework.country_name === value)?.country_name
            : "Required: countries"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search countries..." />
          <CommandList />
          <CommandEmpty>No countries found.</CommandEmpty>
          <CommandGroup>
            {countriesList.map((framework) => (
              <CommandItem
                key={framework.country_code}
                value={framework.country_name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", value === framework.country_name ? "opacity-100" : "opacity-0")} />
                {framework.country_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
function DatePickerWithRange({ className, date, setDate }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground w-60 ")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "y-MM-dd")} - {format(date.to, "y-MM-dd")}
                </>
              ) : (
                format(date.from, "y-MM-dd")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
function PopoverDemo({ adult, setAdult, children, setChildren, childrenAge, setChildrenAge }) {
  function onAdultClick(adjustment) {
    setAdult(Math.max(0, Math.min(100, adult + adjustment)));
  }
  function onChildrenClick(adjustment) {
    const numberOfChildren = children + adjustment;
    let childAge = [];
    let age = "";
    for (let i = 0; i < numberOfChildren; i++) {
      let age = 9;
      // Math.ceil(Math.random() * 17);
      childAge.push(age);
    }
    age = childAge.toString();
    setChildren(Math.max(0, Math.min(100, numberOfChildren)));
    setChildrenAge(age);
  }
  return (
    <div className="relative">
      <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="pl-8 w-full md:w-56">
            Adults: {adult} Non-Adults: {children}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-65">
          <div className="flex flex-wrap">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Adults</h4>
              <p className="text-sm text-muted-foreground">18 or above</p>
            </div>
            <div className="space-y-2">
              {" "}
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onAdultClick(-1)}
                    disabled={adult <= 0}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-xl font-bold tracking-tighter">{adult}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onAdultClick(1)}
                    disabled={adult >= 400}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Non-Adults</h4>
              <p className="text-sm text-muted-foreground">0 to 17</p>
            </div>
            <div className="space-y-2">
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onChildrenClick(-1)}
                    disabled={children <= 0}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-xl font-bold tracking-tighter">{children}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onChildrenClick(1)}
                    disabled={children >= 400}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SearchButton({
  params,
  setParams,
  value,
  checkInDate,
  checkOutDate,
  adult,
  children,
  hotelData,
  setHotelData,
  setOriginalHotelData,
  originalHotelData,
  childrenAge,
  handleSearch,
  count,
  date,
}) {
  useEffect(() => {
    console.log(count);
    async function fetchHotelAPI() {
      setHotelData(null);
      setOriginalHotelData(null);
      const HotelAPIurl = "https://serpapi.com/search.json?engine=google_hotels&";
      const country_code = countriesList.find((a) => a.country_name === value)?.country_code;
      const response = await fetch(
        HotelAPIurl +
          new URLSearchParams({
            q: `${params}`,
            check_in_date: `${date?.from ? format(date.from, "y-MM-dd") : null}`,
            check_out_date: `${
              date?.to == null ? (date?.from ? format(date.from, "y-MM-dd") : null) : format(date.to, "y-MM-dd")
            }`,
            gl: `${country_code}`,
            adults: `${adult}`,
            children: `${children}`,
            children_ages: `${childrenAge}`,
            currency: "HKD",
            api_key: "2d2ecee562168eaed5e57cf9d2f58199d52272e8fb527d44345321e2a8ae25e3",
          })
      );
      const result = await response.json();
      if (!ignore) {
        setOriginalHotelData(result);
        setHotelData(result);
      }
      console.log(result);
      //console.log(originalHotelData);
      //console.log(hotelData);
    }
    let ignore = false;
    fetchHotelAPI();
    return () => {
      ignore = true;
    };
  }, [count]);

  return (
    <Button variant="destructive" type="button" onClick={(e) => handleSearch(e)}>
      Search
    </Button>
  );
}
//completed
export function SearchFunction({ hotelData, setHotelData, originalHotelData, setOriginalHotelData }) {
  let navigate = useNavigate();
  const [date, setDate] = React.useState({
    from: new Date(2024, 3, 20),
    to: addDays(new Date(2024, 3, 20), 2),
  });
  const [adult, setAdult] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [params, setParams] = useState("");
  const [value, setValue] = React.useState("");
  const [childrenAge, setChildrenAge] = useState("");
  // console.log(childrenAge);
  const handleSearch = (e) => {
    e.preventDefault();
    setParams(params);
    console.log(params, `adult: ${adult}`, `children: ${children}`, `country: ${value}`, childrenAge);
    handleFetch();
    navigate("/results");
    // console.log(count);
  };
  const [count, setCount] = useState(0); // control useeffect
  function handleFetch() {
    // render search
    setCount(count + 1);
  }
  return (
    <div className="p-2 flex flex-col gap-2 justify-center md:flex-row mt-2">
      <InputDemo params={params} setParams={setParams} />
      <CountryComboBox value={value} setValue={setValue} />
      <DatePickerWithRange date={date} setDate={setDate} />
      <PopoverDemo
        adult={adult}
        setAdult={setAdult}
        children={children}
        setChildren={setChildren}
        childrenAge={childrenAge}
        setChildrenAge={setChildrenAge}
      />
      <SearchButton
        handleSearch={handleSearch}
        count={count}
        hotelData={hotelData}
        originalHotelData={originalHotelData}
        setOriginalHotelData={setOriginalHotelData}
        setHotelData={setHotelData}
        params={params}
        setParams={setParams}
        value={value}
        adult={adult}
        children={children}
        childrenAge={childrenAge}
        date={date}
      />
    </div>
  );
}
//completed
export function SortFunction({ hotelData, originalHotelData, setHotelData }) {
  // props = {
  //   hotelData :{},
  //   originalHotelData: {}
  // }

  // const {hotelData, originalHotelData, setHotelData} = props;

  function handleRelevance() {
    setHotelData(originalHotelData);
    console.log(hotelData);
  }
  function sortingPrice(hotelData, setHotelData) {
    const sortingList = [...hotelData?.properties];
    console.log(sortingList);
    sortingList.sort((a, b) => a.rate_per_night.extracted_lowest - b.rate_per_night.extracted_lowest);
    console.log(sortingList);
    const testingObject = Object.assign({ properties: [...sortingList] });
    setHotelData(testingObject);
    console.log(testingObject);
  }
  function sortingRating(hotelData, setHotelData) {
    const sortingList = [...hotelData?.properties];
    console.log(sortingList);
    sortingList.sort((a, b) => b.overall_rating - a.overall_rating);
    console.log(sortingList);
    const testingObject = Object.assign({ properties: [...sortingList] });
    setHotelData(testingObject);
    console.log(testingObject);
  }
  // console.log(hotelData);
  return (
    <ToggleGroup variant="outline" className=" space-x-4" type="single">
      <ToggleGroupItem
        className=" font-normal text-xl px-4 focus:bg-[#ABD7D9] focus:border border-gray-400"
        value="a"
        onClick={handleRelevance}
      >
        <svg
          className="inline mr-1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FACA67"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
        Relevance
      </ToggleGroupItem>
      <ToggleGroupItem
        className=" font-normal text-xl px-4 focus:bg-[#ABD7D9] focus:border border-gray-400 "
        value="b"
        onClick={() => sortingPrice(hotelData, setHotelData)}
      >
        <svg
          className="inline mr-1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FACA67"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
        Price <span className="ml-1 text-base">(Lowest)</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        className=" font-normal text-xl px-4 focus:bg-[#ABD7D9] focus:border border-gray-400"
        value="c"
        onClick={() => sortingRating(hotelData, setHotelData)}
      >
        <svg
          className="inline mr-1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FACA67"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        Rating<span className="ml-1 text-base">(Highest)</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

//WIP
export function FilterFunction({ hotelData, originalHotelData, setHotelData }) {
  const [amenitiesCounts, setAmenitiesCounts] = useState([]);
  const [checkedState, setCheckedState] = useState(
    Array(50).fill(false) // or  amenitiesList?.size
  );
  useEffect(() => {
    let emptyArray = [];
    if (hotelData && hotelData.properties && !hotelData.error) {
      const amenitiesList = [
        ...new Set(hotelData.properties.flatMap((property) => property.amenities).filter((a) => a !== undefined)),
      ];
      console.log(amenitiesList);
      for (const e of amenitiesList) {
        const countingAmenities = hotelData.properties.filter((property) => property.amenities.includes(e));
        emptyArray.push({ amenities: e, count: countingAmenities.length });
      }
      setAmenitiesCounts(emptyArray);
      // setCheckedState(Array(amenitiesCounts?.length).fill(false));
    }
  }, [originalHotelData]);
  // console.log(amenitiesCounts);
  console.log("CHECK", checkedState);
  const handleOnChange = (position, checkedState, setCheckedState) => {
    // done
    console.log(checkedState);
    const updatedCheckedState = checkedState?.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
    console.log(updatedCheckedState);
  };
  const unSelectAll = (checkedState, setCheckedState) => {
    // done
    console.log(checkedState);
    const uncheckALL = checkedState?.map(() => false);
    setCheckedState(uncheckALL);
    console.log(uncheckALL);
  };
  const handleFilter = (amenitiesCounts, checkedState, hotelData) => {
    //DONE
    const tickedAmenities = amenitiesCounts
      .map((e, i) => [e, checkedState[i]])
      .filter((e) => e[1] === true)
      .map((e) => e[0].amenities); // select all ticked amenities
    console.log(tickedAmenities); // done
    const filteredHotelData = hotelData?.properties.filter((e) =>
      tickedAmenities.every((t) => e.amenities.includes(t))
    ); // filter out every properties that doesn't have all ticked amenities in filtering array
    const testingObject = Object.assign({ properties: [...filteredHotelData] });
    setHotelData(testingObject);
    console.log(testingObject);
  };
  return (
    <div className="lg:mr-4">
      <p className="lg:mt-2">Filter Amenities</p>
      <div className="grid grid-cols-4 md:flex md:flex-col mb-2">
        {amenitiesCounts.map((item, index) => (
          <div className="flex  items-center space-x-2 text-gray-700" key={index}>
            <div className="pt-1">
              <Checkbox
                checked={checkedState[index]}
                onCheckedChange={() => handleOnChange(index, checkedState, setCheckedState)}
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {`${item?.amenities} (${item?.count})`}
              </label>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="m-1 ml-0"
        onClick={() => {
          unSelectAll(checkedState, setCheckedState);
          setHotelData(originalHotelData);
        }}
      >
        Clear
      </Button>
      <Button className="m-1" onClick={() => handleFilter(amenitiesCounts, checkedState, hotelData)}>
        Submit
      </Button>
    </div>
  );
}
//onClick={handleClear}

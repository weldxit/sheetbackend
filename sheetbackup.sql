--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

-- Started on 2024-08-12 13:07:38 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'BIG5';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16760)
-- Name: sheetdata; Type: TABLE; Schema: public; Owner: weldx
--

CREATE TABLE public.sheetdata (
    id bigint NOT NULL,
    name character varying NOT NULL,
    file text NOT NULL,
    finance character varying
);


ALTER TABLE public.sheetdata OWNER TO weldx;

--
-- TOC entry 220 (class 1259 OID 16765)
-- Name: sheetdata_id_seq; Type: SEQUENCE; Schema: public; Owner: weldx
--

CREATE SEQUENCE public.sheetdata_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sheetdata_id_seq OWNER TO weldx;

--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 220
-- Name: sheetdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: weldx
--

ALTER SEQUENCE public.sheetdata_id_seq OWNED BY public.sheetdata.id;


--
-- TOC entry 3196 (class 2604 OID 16766)
-- Name: sheetdata id; Type: DEFAULT; Schema: public; Owner: weldx
--

ALTER TABLE ONLY public.sheetdata ALTER COLUMN id SET DEFAULT nextval('public.sheetdata_id_seq'::regclass);


--
-- TOC entry 3338 (class 0 OID 16760)
-- Dependencies: 219
-- Data for Name: sheetdata; Type: TABLE DATA; Schema: public; Owner: weldx
--

COPY public.sheetdata (id, name, file, finance) FROM stdin;
15	hdfc-card-payout.xlsx	[{"name":"inc","data":[["FE NAME","Total"],["ABHILASH BEHERA",10000],["ALAKENDU CHAKRABORTY",1750],["ALOK KUMAR NAYAK",10200],["B GANESH RAO",610],["BASANTA PRUSTY",5000],["BICHITRANANDA  SAHOO",2600],["BRAJABANDHU DAS",19500],["CHANDRABHANU SWAIN",14050],["HARAPRASAD MOHANTY",10000],["JNAN RANJAN ROUT",6200],["PRABIN KUMAR CHHOTRAY",2350],["PRAMOD NAYAK",11500],["PRAMODKUMAR  SWAIN",18500],["PRAVAT RANJAN SAHU",13150],["RAKESH KUMAR MUNSHI",448],["RAMESH CHANDRA LENKA",6500],["RASHMI SWAIN",4000],["SOVRAJ DWIBEDY",5200],["TUNA SAHU",6000],["Grand Total",144058]]},{"name":"fix","data":[["FOS","FIX AMT"],["ABHILASH BEHERA",7000],["ALAKENDU CHAKRABORTY",4000],["ALOK KUMAR NAYAK",10000],["ALOK KUMAR SWAIN",5000],["ANIL SAHU",8000],["B GANESH RAO",6000],["B GANESH RAO",5000],["BASANTA PRUSTY",7000],["BHRUGU NAYAK ",7000],["BIBHUTI BHUSAN SAHU",5000],["BICHITRANANDA  SAHOO",3000],["BRAJABANDHU DAS",20000],["CHANDRABHANU SWAIN",6000],["CHANDRAMOLI SHARMA",3000],["DEBI PRASAD SAHU",1000],["DIPTI RANJAN RANA",3000],["HARAPRASAD MOHANTY",5000],["JNAN RANJAN ROUT",8000],["KARTIKA",3000],["MITHUN PATI",4000],["NALINIKANTA SETHY",3000],["NARAYAN LENKA",5000],["PRABINA KUMAR CHHOTARY",3000],["PRADEEP KUMAR BHOI",2000],["PRAMOD NAYAK",3000],["PRAMODKUMAR  SWAIN",15000],["PRATAP BEHERA",1000],["PRAVAT RANJAN SAHU",5000],["RAJAT RATH",5000],["RAKESH KUMAR MUNSHI",3000],["RAMESH CHANDRA LENKA",5000],["RASHMI  SWAIN",5000],["RASHMI  SWAIN",5000],["RATAN SAHU",2000],["SAMIR KUMAR BEHERA",1500],["SATYA NARAYAN SETH",2500],["SIDHESWAR SAHOO",5000],["SOUBHAGYA DAS",4000],["SOVRAJ DWIBEDY",5000],["SURESH NIAL",3000],["TUNA SAHU",7000],["UMAKANTA BEHERA",3000]]},{"name":"0","data":[["SLAB","PAYOUT"],["0-50",110],["50-70",150],["70-75",300],["75-80",350],["80-500",450]]},{"name":"1","data":[["SLAB","PAYOUT"],["0-70",0.02],["70-75",0.03],["75-80",0.04],["80-500",0.05]]},{"name":"2","data":[["SLAB","PAYOUT"],["0-40",0.02],["40-45",0.03],["45-50",0.04],["50-60",0.045],["60-500",0.05]]},{"name":"4","data":[["SLAB","PAYOUT"],["FLAT",0.03]]},{"name":"5","data":[["SLAB","PAYOUT"],["FLAT",0.03]]},{"name":"6","data":[["SLAB base on collection amt","PAYOUT"],["0-1l",0.08],["1l- 2l",0.09],["2l-4l",0.1],["4l- 6l",0.11],["6l- 8l",0.12],["8l-10l",0.13],["10l ¡V 100l",0.15]]},{"name":"3","data":[["SLAB","PAYOUT"],["FLAT",0.03]]}]	HDFC
12	paysheet.xlsx	[{"name":"0","data":[["stab","payout"],[85,"100-0"],[88,"150-10"],[91,"170-15"],[93,"200-20"],[95,"250-25"],[98,"320-30"],[99,"350-50"],[],[],[],[],[],[]]},{"name":"1","data":[["stab","0-15","15-18","18-25","25-30","30 -35","35-40","40-500"],["0-78 ","170-20","180-25","220-40","300-45","350-50","439-30","439-30"],["78-80","180-25","200-35","240-45","330-50","400-55","480-35","480-35"],["82-85","190-30","220-40","280-50","350-55","450-60","496-40","496-40"],["82-85","200-35","230-45","300-55","380-60","480-65","513-45","513-45"],["85-87","220-40","250-50","330-60","400-65","500-70","538-50","538-50"],["87-90","250-45","300-55","370-65","480-70","520-75","565-55","565-55"],["90-92","280-50","320-60","400-70","500-75","540-80","587-60","587-60"],["92-95","300-55","350-65","430-75","510-80","560-85","610-65","610-65"],["95-97","320-60","370-70","450-80","520-85","580-90","627-70","627-70"],["97-500 ","350-65","390-75","480-85","530-90","600-95","650-75","650-75"]]},{"name":"2","data":[["stab","0-12","12-16","16-20","20-24","24-28","28-32","32-36","36-500"],["0-50","150-20","170-30","200-35","210-40","240-45","250-20","300-25","310-30"],["50-55","170-25","200-35","210-40","220-45","250-50","280-25","310-30","330-35"],["55-60","200-30","210-40","220-45","240-50","280-55","300-30","330-35","350-40"],["60-65","210-35","220-45","240-50","250-55","300-60","310-35","350-40","370-45"],["65-70","220-40","240-50","250-55","280-60","310-65","330-40","370-45","390-50"],["70-75","240-45","250-55","280-60","300-65","330-70","350-45","390-50","400-55"],["75-80","250-50","280-60","300-65","310-70","350-75","370-50","400-55","455-60"],["80-85","280-55","300-65","310-70","330-75","370-80","390-55","420-60","440-65"],["85-90","300-60","310-70","330-75","350-80","390-85","400-60","440-65","450-70"],["90-500","310-70","330-80"]]},{"name":"3","data":[["stab","0-10","10 - 12","12-15","15-18","18-20","20-25","25-500"],["0-45","150-20","200-25","210-30","230-35"],["45-50","180-25","210-30","230-35","250-40"],["50-55","210-30","230-35","250-40","260-45"],["55-60","230-35","250-40","260-45","280-50"],["60-63","250-40","260-45","280-50","300-55","330-20","350-40","360-60"],["63-65","260-45","280-50","300-55","310-60","340-25","360-45","380-65"],["65-72","280-50","300-55","310-60","330-65","350-30","370-50","390-70"],["72-500","300-55","310-60","330-65","350-70","360-35","380-55","400-75"]]},{"name":"4","data":[["stab","0-10","10- 12","12-15","15-18","18-20","20-25","25-500"],["0-45","135-5","150-10","160-15"],["45-49.59","150-10","160-15","170-20"],["50-55","160-15","170-20","180-25"],["55-58","170-20","180-25","190-30"],["58-60","180-25","190-30","200-35","240-45","250-50","260-55","270-60"],["60-65","190-30","200-35","220-40","250-50","260-55","265-60","270-65"],["65-70","200-35","220-40","235-45","260-55","265-60","270-65","280-70"],["70-500","235-45","250-50","260-55","270-65","280-70","290-75","300-80"]]},{"name":"5","data":[["stab","0-10","10- 12","12-15","15-18","18-20","20-25","25-500"],["0-45","135-5","150-10","160-15","170-20","170-20","170-20","170-20"],["45-49.59","150-10","160-15","170-20"],["50-55","160-15","170-20","180-25"],["55-58","170-20","180-25","190-30"],["58-60","180-25","190-30","200-35","240-45","250-50","260-55","270-60"],["60-65","190-30","200-35","220-40","250-50","260-55","265-60","270-65"],["65-70","200-35","220-40","235-45","260-55","265-60","270-65","280-70"],["70-500","235-45","250-50","260-55","270-65","280-70","290-75","300-80"]]}]	IDFC
\.


--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 220
-- Name: sheetdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: weldx
--

SELECT pg_catalog.setval('public.sheetdata_id_seq', 15, true);


--
-- TOC entry 3198 (class 2606 OID 16768)
-- Name: sheetdata sheetdata_pkey; Type: CONSTRAINT; Schema: public; Owner: weldx
--

ALTER TABLE ONLY public.sheetdata
    ADD CONSTRAINT sheetdata_pkey PRIMARY KEY (id);


-- Completed on 2024-08-12 13:07:46 IST

--
-- PostgreSQL database dump complete
--


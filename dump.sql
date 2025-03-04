PGDMP                      }            gacha    17.2    17.2 5    9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            <           1262    32774    gacha    DATABASE     |   CREATE DATABASE gacha WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE gacha;
                     postgres    false            �            1259    40994    factory    TABLE     �   CREATE TABLE public.factory (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    quality character varying(255) NOT NULL,
    production_rate integer NOT NULL
);
    DROP TABLE public.factory;
       public         heap r       postgres    false            �            1259    40993    factory_id_seq    SEQUENCE     �   CREATE SEQUENCE public.factory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.factory_id_seq;
       public               postgres    false    226            =           0    0    factory_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.factory_id_seq OWNED BY public.factory.id;
          public               postgres    false    225            �            1259    41002    factory_inventory    TABLE     �   CREATE TABLE public.factory_inventory (
    user_id integer,
    factory_id integer,
    quantity integer DEFAULT 1 NOT NULL
);
 %   DROP TABLE public.factory_inventory;
       public         heap r       postgres    false            �            1259    41016    factory_upgrades    TABLE     h   CREATE TABLE public.factory_upgrades (
    factory_id integer NOT NULL,
    item_id integer NOT NULL
);
 $   DROP TABLE public.factory_upgrades;
       public         heap r       postgres    false            �            1259    32802    fish    TABLE     �   CREATE TABLE public.fish (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    rarity character varying(255) NOT NULL,
    CONSTRAINT fish_price_check CHECK ((price >= 0))
);
    DROP TABLE public.fish;
       public         heap r       postgres    false            �            1259    32801    fish_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fish_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.fish_id_seq;
       public               postgres    false    220            >           0    0    fish_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.fish_id_seq OWNED BY public.fish.id;
          public               postgres    false    219            �            1259    32809 	   inventory    TABLE     �   CREATE TABLE public.inventory (
    user_id integer NOT NULL,
    fish_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    CONSTRAINT inventory_quantity_check CHECK ((quantity > 0))
);
    DROP TABLE public.inventory;
       public         heap r       postgres    false            �            1259    40978    item_inventory    TABLE     c   CREATE TABLE public.item_inventory (
    user_id integer NOT NULL,
    item_id integer NOT NULL
);
 "   DROP TABLE public.item_inventory;
       public         heap r       postgres    false            �            1259    40970    items    TABLE     k   CREATE TABLE public.items (
    id integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL
);
    DROP TABLE public.items;
       public         heap r       postgres    false            �            1259    40969    items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.items_id_seq;
       public               postgres    false    223            ?           0    0    items_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;
          public               postgres    false    222            �            1259    32791    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    wallet integer DEFAULT 0 NOT NULL,
    last_gacha_time timestamp without time zone,
    CONSTRAINT users_wallet_check CHECK ((wallet >= 0))
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    32790    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218            @           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            {           2604    40997 
   factory id    DEFAULT     h   ALTER TABLE ONLY public.factory ALTER COLUMN id SET DEFAULT nextval('public.factory_id_seq'::regclass);
 9   ALTER TABLE public.factory ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    226    226            x           2604    32805    fish id    DEFAULT     b   ALTER TABLE ONLY public.fish ALTER COLUMN id SET DEFAULT nextval('public.fish_id_seq'::regclass);
 6   ALTER TABLE public.fish ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            z           2604    40973    items id    DEFAULT     d   ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);
 7   ALTER TABLE public.items ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    222    223            v           2604    32794    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            4          0    40994    factory 
   TABLE DATA           L   COPY public.factory (id, name, price, quality, production_rate) FROM stdin;
    public               postgres    false    226   >       5          0    41002    factory_inventory 
   TABLE DATA           J   COPY public.factory_inventory (user_id, factory_id, quantity) FROM stdin;
    public               postgres    false    227   �>       6          0    41016    factory_upgrades 
   TABLE DATA           ?   COPY public.factory_upgrades (factory_id, item_id) FROM stdin;
    public               postgres    false    228   �>       .          0    32802    fish 
   TABLE DATA           7   COPY public.fish (id, name, price, rarity) FROM stdin;
    public               postgres    false    220   �>       /          0    32809 	   inventory 
   TABLE DATA           ?   COPY public.inventory (user_id, fish_id, quantity) FROM stdin;
    public               postgres    false    221   U?       2          0    40978    item_inventory 
   TABLE DATA           :   COPY public.item_inventory (user_id, item_id) FROM stdin;
    public               postgres    false    224   �?       1          0    40970    items 
   TABLE DATA           0   COPY public.items (id, name, price) FROM stdin;
    public               postgres    false    223   �?       ,          0    32791    users 
   TABLE DATA           B   COPY public.users (id, name, wallet, last_gacha_time) FROM stdin;
    public               postgres    false    218   �?       A           0    0    factory_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.factory_id_seq', 3, true);
          public               postgres    false    225            B           0    0    fish_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.fish_id_seq', 3, true);
          public               postgres    false    219            C           0    0    items_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.items_id_seq', 1, false);
          public               postgres    false    222            D           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public               postgres    false    217            �           2606    41001    factory factory_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.factory
    ADD CONSTRAINT factory_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.factory DROP CONSTRAINT factory_pkey;
       public                 postgres    false    226            �           2606    41020 &   factory_upgrades factory_upgrades_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.factory_upgrades
    ADD CONSTRAINT factory_upgrades_pkey PRIMARY KEY (factory_id, item_id);
 P   ALTER TABLE ONLY public.factory_upgrades DROP CONSTRAINT factory_upgrades_pkey;
       public                 postgres    false    228    228            �           2606    32808    fish fish_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.fish
    ADD CONSTRAINT fish_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.fish DROP CONSTRAINT fish_pkey;
       public                 postgres    false    220            �           2606    32815    inventory inventory_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (user_id, fish_id);
 B   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_pkey;
       public                 postgres    false    221    221            �           2606    40982 "   item_inventory item_inventory_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.item_inventory
    ADD CONSTRAINT item_inventory_pkey PRIMARY KEY (user_id, item_id);
 L   ALTER TABLE ONLY public.item_inventory DROP CONSTRAINT item_inventory_pkey;
       public                 postgres    false    224    224            �           2606    40977    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public                 postgres    false    223            �           2606    41038 %   factory_inventory unique_user_factory 
   CONSTRAINT     o   ALTER TABLE ONLY public.factory_inventory
    ADD CONSTRAINT unique_user_factory UNIQUE (user_id, factory_id);
 O   ALTER TABLE ONLY public.factory_inventory DROP CONSTRAINT unique_user_factory;
       public                 postgres    false    227    227            �           2606    32800    users users_name_key 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT users_name_key;
       public                 postgres    false    218            �           2606    32798    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �           2606    41011 3   factory_inventory factory_inventory_factory_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.factory_inventory
    ADD CONSTRAINT factory_inventory_factory_id_fkey FOREIGN KEY (factory_id) REFERENCES public.factory(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.factory_inventory DROP CONSTRAINT factory_inventory_factory_id_fkey;
       public               postgres    false    4749    227    226            �           2606    41006 0   factory_inventory factory_inventory_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.factory_inventory
    ADD CONSTRAINT factory_inventory_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.factory_inventory DROP CONSTRAINT factory_inventory_user_id_fkey;
       public               postgres    false    4739    227    218            �           2606    41021 1   factory_upgrades factory_upgrades_factory_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.factory_upgrades
    ADD CONSTRAINT factory_upgrades_factory_id_fkey FOREIGN KEY (factory_id) REFERENCES public.factory(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.factory_upgrades DROP CONSTRAINT factory_upgrades_factory_id_fkey;
       public               postgres    false    226    228    4749            �           2606    41026 .   factory_upgrades factory_upgrades_item_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.factory_upgrades
    ADD CONSTRAINT factory_upgrades_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.factory_upgrades DROP CONSTRAINT factory_upgrades_item_id_fkey;
       public               postgres    false    223    4745    228            �           2606    32821     inventory inventory_fish_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_fish_id_fkey FOREIGN KEY (fish_id) REFERENCES public.fish(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_fish_id_fkey;
       public               postgres    false    220    4741    221            �           2606    32816     inventory inventory_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_user_id_fkey;
       public               postgres    false    4739    221    218            �           2606    40988 *   item_inventory item_inventory_item_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item_inventory
    ADD CONSTRAINT item_inventory_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.item_inventory DROP CONSTRAINT item_inventory_item_id_fkey;
       public               postgres    false    4745    224    223            �           2606    40983 *   item_inventory item_inventory_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item_inventory
    ADD CONSTRAINT item_inventory_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.item_inventory DROP CONSTRAINT item_inventory_user_id_fkey;
       public               postgres    false    224    218    4739            4   \   x�3��(��-PpK,��440�t�����2��8���<K�3R�*9M��A�E�@�1gxFbN�BPjZfTҀ�'5=5/%������ L!�      5      x�3�4�46�2�4�����&\1z\\\ *v/      6      x������ � �      .   r   x�3�t��II�,��44�t������2�t�)MM��S)�K�450�J,J�2�t��/��65��K��7�t)JLχH�������$Ur�rd%�e$r�]2��b���� �}#�      /      x�3�4�4�2�4�4��@v� !��      2      x������ � �      1      x������ � �      ,   ;   x�3�,��NL�(�44544121�4202�50�54T04�20�24ֳ4020������� 3�
�     
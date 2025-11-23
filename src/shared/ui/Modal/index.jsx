import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModals } from '../../../redux/products/reducer';
import { CloseIcon } from '../../assets/icons/CloseIcon';

import { Form } from '../Form';
import { Input } from '../Input';
import { Button } from '../Button';

import { CustomSelect } from '../Select/Select';
import { addProductSchema } from '../Form/shemas/productSchema';
import { addProduct, editProduct } from '../../../redux/products/operations';
import { selectModalData } from '../../../redux/products/selectors';
import { DateInput } from '../Input/DateInput';
import productOptions from '../../../data/addProduct';
import addSupplier from '../../../data/addSupplier';
import { addSuppliersSchema } from '../Form/shemas/supplierSchema';
import {
  addSuppliers,
  editSuppliers,
} from '../../../redux/suppliers/operations';
import { closeSupplierModals } from '../../../redux/suppliers/reducer';
import { selectModalDataSuppliers } from '../../../redux/suppliers/selectors';
import { editSupplierSchema } from '../Form/shemas/editSupplierSchema';
import { cn } from '../../lib/cn';
import { cva } from 'class-variance-authority';
import { NavLink } from 'react-router-dom';
import { DashboardIcon } from '../../assets/icons/DashboardIcon';
import { OrdersIcon } from '../../assets/icons/OrdersIcon';
import { ProductsIcon } from '../../assets/icons/ProductsIcon';
import { SuppliersIcon } from '../../assets/icons/SuppliersIcon';
import { CustomersIcon } from '../../assets/icons/CustomersIcon';
import { logOutThunk } from '../../../redux/auth/operations';
import { LogOutIcon } from '../../assets/icons/LogOutIcon';
import { closeHeaderModal } from '../../../redux/dashboard/reducer';

export const Modal = ({ className, variant, modal = 'default' }) => {
  const dispatch = useDispatch();
  const modalData = useSelector(selectModalData);
  const modalDataSuppliers = useSelector(selectModalDataSuppliers);

  const modalVariants = cva(' ', {
    variants: {
      modal: {
        default:
          'absolute left-[50%] top-[50%] box-border flex min-h-[400px]    w-[500px] translate-x-[-50%] translate-y-[-50%] flex-col items-center rounded-[12px] bg-white mobile-sm:p-[20px] tablet:p-[40px] mobile-sm:w-[335px] tablet:w-[540px]',
        sideBar:
          'absolute h-[100vh] left-[0] top-[0]  box-border w-[84px] flex-col items-center bg-gray-f7',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });

  const addProductSubmit = (value) => {
    dispatch(addProduct(value));
  };

  const addSuppliersSubmit = (value) => {
    dispatch(addSuppliers(value));
  };

  const editProductSubmit = (value) => {
    dispatch(editProduct({ id: modalData._id, data: value }));
  };
  const editSupplierSubmit = (value) => {
    dispatch(editSuppliers({ id: modalDataSuppliers._id, data: value }));
  };

  const addProductVariant = (
    <>
      <Form
        className="gap-[8px]"
        variant="wrap"
        label="Add a new product"
        submit={addProductSubmit}
        validationSchema={addProductSchema}
        isReset={false}
      >
        <Input
          name="name"
          placeholder="Product Info"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <CustomSelect
          name="category"
          placeholder="Category"
          options={productOptions}
        />
        <Input
          name="stock"
          placeholder="Stock"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <Input
          name="suppliers"
          placeholder="Suppliers"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <Input
          name="price"
          placeholder="Price"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />

        <div className="mt-[40px] flex w-full gap-[8px]">
          <Button type="submit" className="w-1/2 px-[52.5px]">
            Add
          </Button>
          <Button
            onClick={() => closeModal()}
            type="button"
            size="gray"
            className="w-1/2 px-[43px]"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );

  const editProductVariant = (
    <>
      <Form
        className="gap-[8px]"
        variant="wrap"
        label="Edit product"
        submit={editProductSubmit}
        validationSchema={addProductSchema}
        isReset={false}
      >
        <Input
          defaultValue={modalData?.name}
          name="name"
          placeholder="Product Info"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <CustomSelect
          name="category"
          placeholder="Category"
          options={productOptions}
          defaultValue={{
            value: modalData?.category,
            label: modalData?.category,
          }}
        />
        <Input
          defaultValue={modalData?.stock}
          name="stock"
          placeholder="Stock"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <Input
          defaultValue={modalData?.suppliers}
          name="suppliers"
          placeholder="Suppliers"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <Input
          defaultValue={modalData?.price}
          name="price"
          placeholder="Price"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />

        <div className="mt-[40px] flex w-full gap-[8px]">
          <Button type="submit" className="px-[52.5px]">
            Save
          </Button>
          <Button
            onClick={() => closeModal()}
            type="button"
            size="gray"
            className="px-[43px]"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );

  const addSupplierVariant = (
    <>
      <Form
        className="gap-[8px]"
        variant="wrap"
        label="Add a new suppliers"
        submit={addSuppliersSubmit}
        validationSchema={addSuppliersSchema}
        isReset={false}
      >
        <Input
          name="name"
          placeholder="Suppliers info"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <Input
          name="address"
          placeholder="Address"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <Input
          name="suppliers"
          placeholder="Company"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <DateInput name="date" placeholder="Delivery date" />
        <Input
          name="amount"
          placeholder="Amount"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <CustomSelect
          name="status"
          placeholder="Status"
          options={addSupplier}
        />

        <div className="mt-[40px] flex w-full gap-[8px]">
          <Button type="submit" className="px-[52.5px]">
            Add
          </Button>
          <Button
            onClick={() => closeModal()}
            type="button"
            size="gray"
            className="px-[43px]"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );

  const editSupplierVariant = (
    <>
      <Form
        className="gap-[8px]"
        variant="wrap"
        label="Edit supplier"
        submit={editSupplierSubmit}
        validationSchema={editSupplierSchema}
        isReset={false}
      >
        <Input
          name="name"
          defaultValue={modalDataSuppliers?.name}
          placeholder="Suppliers info"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <Input
          name="address"
          defaultValue={modalDataSuppliers?.address}
          placeholder="Address"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <Input
          name="suppliers"
          defaultValue={modalDataSuppliers?.suppliers}
          placeholder="Company"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <DateInput
          name="date"
          placeholder="Delivery date"
          defaultValue={modalDataSuppliers?.date}
        />
        <Input
          name="amount"
          defaultValue={modalDataSuppliers?.amount}
          placeholder="Amount"
          className="mobile-sm:w-[295px] tablet:w-[224px]"
        />
        <CustomSelect
          name="status"
          defaultValue={{
            value: modalDataSuppliers?.status,
            label: modalDataSuppliers?.status,
          }}
          placeholder="Status"
          options={addSupplier}
        />

        <div className="mt-[40px] flex w-full gap-[8px]">
          <Button type="submit" className="px-[52.5px]">
            Save
          </Button>
          <Button
            onClick={() => closeModal()}
            type="button"
            size="gray"
            className="px-[43px]"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );

  const sideBar = (
    <div className=" items flex flex-col justify-between">
      <div className="mt-[100px] flex flex-col items-center gap-[14px]">
        <NavLink
          onClick={() => closeModal()}
          to="/"
          className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white hover:bg-green-accent-0.1"
        >
          {({ isActive }) => <DashboardIcon isActive={isActive} />}
        </NavLink>
        <NavLink
          onClick={() => closeModal()}
          to="/orders"
          className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white hover:bg-green-accent-0.1"
        >
          {({ isActive }) => <OrdersIcon isActive={isActive} />}
        </NavLink>
        <NavLink
          onClick={() => closeModal()}
          to="/products"
          className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white hover:bg-green-accent-0.1"
        >
          {({ isActive }) => <ProductsIcon isActive={isActive} />}
        </NavLink>
        <NavLink
          onClick={() => closeModal()}
          to="/suppliers"
          className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white hover:bg-green-accent-0.1"
        >
          {({ isActive }) => <SuppliersIcon isActive={isActive} />}
        </NavLink>
        <NavLink
          onClick={() => closeModal()}
          to="/customers"
          className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white hover:bg-green-accent-0.1"
        >
          {({ isActive }) => <CustomersIcon isActive={isActive} />}
        </NavLink>
        <NavLink
          to="/user-friends"
          className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white hover:bg-green-accent-0.1"
        >
          <div className="w-full h-full bg-green-accent flex items-center justify-center rounded-full">Feeds</div>
        </NavLink>
      </div>

      <button
        onClick={() => dispatch(logOutThunk())}
        className="absolute bottom-[60px] left-[25%] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-green-accent hover:bg-[#59b17a99]"
      >
        <LogOutIcon />
      </button>
    </div>
  );

  const closeModal = () => {
    dispatch(closeModals());
    dispatch(closeSupplierModals());
    dispatch(closeHeaderModal());

    document.body.classList.remove('add-overflov');
  };

  const closeFromOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const closeModalFromEsc = (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModalFromEsc);
    return () => {
      window.removeEventListener('keydown', closeModalFromEsc);
    };
  }, []);

  return (
    <div
      onClick={closeFromOverlay}
      className="fixed left-0 top-0 z-[50] h-[100vh] w-[100vw] bg-[#14141499]"
    >
      <div className={cn(modalVariants({ modal, className }))}>
        <button
          onClick={closeModal}
          className="absolute right-[16px] top-[16px] border-none bg-transparent"
        >
          <CloseIcon />
        </button>

        {variant === 'addProduct' && addProductVariant}
        {variant === 'editProduct' && editProductVariant}
        {variant === 'addSupplier' && addSupplierVariant}
        {variant === 'editSupplier' && editSupplierVariant}
        {variant === 'sideBar' && sideBar}
      </div>
    </div>
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  modal: PropTypes.string,
};

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetVariantApiQuery } from '../redux/features/api/variantApi';
import { addToCompare, removeFromCompare, clearCompare } from '../redux/features/slice/compareSlice';
import toast from 'react-hot-toast';
import { Modal, Button, Form } from 'react-bootstrap';
import '@smastrom/react-rating/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Compare = () => {
  const dispatch = useDispatch();
   const { token, user } = useSelector((state) => state.auth);
  const { compareItems } = useSelector((state) => state.compare);
  const { data: variants, isLoading, isError, error } = useGetVariantApiQuery();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCompare = (variant) => {
    if (compareItems.length >= 4) {
      toast.error('Cannot compare more than 4 products!');
      return;
    }
    if (compareItems.some((item) => item.id === variant.id)) {
      toast.error('This product is already in comparison!');
      return;
    }
  
    const variantWithUserId = {
      ...variant,
      user_id: user?.id || null,
    };
  
    dispatch(addToCompare(variantWithUserId));
    toast.success('Added to comparison');
    try {
      const updatedCompareItems = [...compareItems, variantWithUserId];
      localStorage.setItem('compareItems', JSON.stringify(updatedCompareItems));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      toast.error('Failed to save to comparison');
    }
  };

  const handleRemoveFromCompare = (id) => {
    dispatch(removeFromCompare(id));
    const updatedCompareItems = compareItems.filter((item) => item.id !== id);
    localStorage.setItem('compareItems', JSON.stringify(updatedCompareItems));
    toast.success('Removed from comparison');
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
    localStorage.setItem('compareItems', JSON.stringify([]));
    toast.success('All products cleared from comparison');
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSearchQuery('');
  };

  const filteredVariants = variants?.variant.filter((variant) =>
    variant.variant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    variant.product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderComparisonTable = () => {
    if (compareItems.length === 0) {
      return (
        <div className="text-center py-5">
          <h5>No products selected for comparison.</h5>
          <Button variant="primary" onClick={handleOpenModal}>
            Add Products
          </Button>
        </div>
      );
    }

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <tbody>
            <tr>
              <th scope="row" className="align-middle text-center">Image</th>
              {compareItems.map((item) => (
                <td key={item.id} className="text-center position-relative">
                  <i
                    className="ph ph-x-circle text-danger position-absolute"
                    style={{ top: '10px', right: '10px', fontSize: '24px', cursor: 'pointer' }}
                    onClick={() => handleRemoveFromCompare(item.id)}
                  />
                  <img
                    src={`https://fashion-backend.eclipseposapp.com/${item.variant_image[0]?.image}`}
                    alt={item.variant_name}
                    className="img-fluid"
                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Product Name</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center">{item.product.product_name}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Variant Name</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center">{item.variant_name}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Price</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center">USD {parseFloat(item.regular_price).toFixed(2)}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Stock</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center">{item.product_stock.StockQuantity}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Color</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center">{item.color || 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Size</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center">{item.size || 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Weight</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center">{item.weight ? `${item.weight}g` : 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">SKU</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center">{item.product.sku}</td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Shipping</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center">
                  {item.product.shipping_charge === 'paid' ? 'From $20.00' : 'Free'}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Description</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center" style={{ maxWidth: '250px' }}>
                  <div
                    className="text-wrap"
                    style={{ overflowWrap: 'break-word' }}
                    dangerouslySetInnerHTML={{
                      __html: item.product.product_details.short_description,
                    }}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="align-middle text-center">Features</th>
              {compareItems.map((item) => (
                <td key={item.id} className="align-middle text-center" style={{ maxWidth: '250px' }}>
                  <ul className="list-unstyled mb-0" style={{ overflowWrap: 'break-word' }}>
                    {item.product.product_features.map((feature) => (
                      <li key={feature.id}>{feature.feature.feature_name}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Compare Products</h2>
              <div>
                {compareItems.length < 4 && (
                  <Button variant="primary" onClick={handleOpenModal} className="me-2">
                    Add Product
                  </Button>
                )}
                {compareItems.length > 0 && (
                  <Button variant="danger" onClick={handleClearAll}>
                    Clear All
                  </Button>
                )}
              </div>
            </div>
            {isLoading && <p className="text-center">Loading...</p>}
            {isError && <p className="text-danger text-center">Error: {error.message}</p>}
            {renderComparisonTable()}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Products to Compare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by product or variant name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          {isLoading ? (
            <p className="text-center">Loading variants...</p>
          ) : isError ? (
            <p className="text-danger text-center">Error: {error.message}</p>
          ) : filteredVariants?.length === 0 ? (
            <p className="text-center">No products found.</p>
          ) : (
            <div className="row">
              {filteredVariants.map((variant) => (
                <div key={variant.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img
                      src={`https://fashion-backend.eclipseposapp.com/${variant.variant_image[0]?.image}`}
                      className="card-img-top"
                      alt={variant.variant_name}
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{variant.variant_name}</h5>
                      <p className="card-text">
                        Price: USD {parseFloat(variant.regular_price).toFixed(2)}
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCompare(variant)}
                        disabled={compareItems.some((item) => item.id === variant.id)}
                      >
                        {compareItems.some((item) => item.id === variant.id)
                          ? 'Already Added'
                          : 'Add to Compare'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Compare;
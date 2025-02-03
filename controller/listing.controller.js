import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found'));
  }
  if (listing.userRef !== req.user.id) {
    return next(errorHandler(401, 'You can only delete your own listing'));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted');
  } catch (error) {
    next(error);
  }
};
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found'));
  }
  if (listing.userRef !== req.user.id) {
    return next(errorHandler(401, 'You can only update your own listing'));
  }
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};




export const getListing = async (req, res, next) => {

//   try {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) {
//       return next(errorHandler(404, 'Listing not found'));
//     }
//     res.status(200).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

  try {
    const {id} = req.params;
    if(!ObjectId.isValid(id)){
      return res.status(400).send('Invalid Id');
    }
  
    const listing = await Listing.findById(id);
    if(!listing){
      return res.status(400).send('Listing not found');
    }
  
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  } try {
    const { id } = req.params;

    // Validate if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid listing ID' });
    }

    // Fetch the listing from the database
    const listing = await Listing.findById(id);

    // Check if the listing exists
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Return the listing
    res.status(200).json(listing);
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }

};




export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Search,
  Share2,
  Users,
  BarChart3,
  Grid3X3,
  Copy,
  ExternalLink,
  Shield,
  Star,
  Eye,
} from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NFTCard from "@/components/nft-card";
import {
  getCollectionBySlug,
  getAssetsByCollection,
  getCreatorByName,
} from "@/lib/mock-data";
import { useGetCollection, useGetCollectionId } from "@/hooks/use-collection";
import { Collection } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useCollectionAssets } from "@/hooks/use-collection-assets";
import { toHexString } from "@/lib/utils";
import Image from "next/image";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default function CollectionPage() {
  const params = useParams();
  const { collectionAddress } = params;
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [copied, setCopied] = useState<string | null>(null);

  // Get collection from mock data
  const { fetchCollectionId } = useGetCollectionId(collectionAddress as string);
  const { fetchCollection } = useGetCollection();

  const [collection, setCollection] = useState<Collection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const collectionId = await fetchCollectionId();
        const collectionData = await fetchCollection(collectionId.toString());
        setCollection(collectionData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch collection",
        );
      } finally {
      }
    };

    if (collectionAddress) {
      loadCollection();
    }
  }, [fetchCollection, fetchCollectionId, collectionAddress]);

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Error Loading Collection</h1>
        </div>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }
  const collectionAssets = collection
    ? getAssetsByCollection(collection.name)
    : [];
  const creator = collection ? getCreatorByName(collection.owner) : null;

  if (!collection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Collection Not Found</h1>
          <p className="text-muted-foreground">
            The collection you're looking for doesn't exist.
          </p>
          <Link href="/collections">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Collections
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const filteredAssets = collectionAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const coverImage =
    collection.image && collection.image !== "/placeholder.svg"
      ? collection.image
      : "/placeholder.svg?height=400&width=600";

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: collection.name,
        text: `Check out the ${collection.name} collection`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <Link href="/collections" className="inline-block mb-8">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collections
          </Button>
        </Link>

        {/* Collection Header */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div className="h-48 md:h-64 relative overflow-hidden rounded-xl mb-6">
            <img
              src={coverImage || "/placeholder.svg"}
              alt={collection.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {collection.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white backdrop-blur-sm"
                    >
                      {collection.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-white/20 text-white backdrop-blur-sm border-white/30"
                    >
                      {collection.totalSupply} assets
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Favorite
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleShare}
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collection Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {collection.description}
                </p>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Assets
                      </p>
                      <p className="text-2xl font-bold">
                        {collection.totalSupply}
                      </p>
                    </div>
                    <Grid3X3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Value
                      </p>
                      <p className="text-2xl font-bold">
                        {collection.totalSupply * collection.floorPrice!}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Floor Price
                      </p>
                      <p className="text-2xl font-bold">0.3 ETH</p>
                    </div>
                    <Eye className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Owners</p>
                      <p className="text-2xl font-bold">
                        {Math.ceil(collection.totalMinted * 0.7)}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            {/* Collection Details */}
            <Card>
              <CardHeader>
                <CardTitle>Collection Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Contract Address
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(collection.nftAddress, "address")}
                    className="h-auto p-1 font-mono text-xs"
                  >
                    {/*Could be the actual `collectionAddress` param used in the URL*/}
                    {collection.nftAddress.substring(0, 6)}...
                    {collection.nftAddress.substring(
                      collection.nftAddress.length - 4,
                    )}
                    <Copy className="h-3 w-3 ml-1" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Blockchain
                  </span>
                  <Badge variant="outline">Ethereum</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Token Standard
                  </span>
                  <Badge variant="outline">ERC-721</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm">{collection.lastBurnTime}</span>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Etherscan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card>
              <CardHeader>
                <CardTitle>Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        creator?.avatar || "/placeholder.svg?height=40&width=40"
                      }
                      alt={collection.owner}
                    />
                    <AvatarFallback>
                      {collection.owner.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {creator ? (
                        <Link href={`/creators/${creator.slug}`}>
                          <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer">
                            {collection.owner}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="font-semibold">{collection.owner}</h3>
                      )}
                      {collection.isActive && (
                        <Badge variant="secondary">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    {collection.owner && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                    {creator && (
                      <Link href={`/creators/${collection.owner}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Assets Section */}
        <CollectionNFTs
          nftAddress={collectionAddress as string}
          totalSupply={collection.totalSupply}
        />
      </main>
    </div>
  );
}

const CollectionNFTs = React.memo(
  ({
    nftAddress,
    totalSupply,
  }: {
    nftAddress: string;
    totalSupply: number;
  }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const paramsLocal = useParams();
    const idParam = String(paramsLocal?.id || "");

    // Memoize the hook call parameters
    const hookParams = useMemo(
      () => ({
        totalSupply,
        limit: Math.min(totalSupply || 10, 10), //limit is ten for now
      }),
      [totalSupply],
    );

    const { assets, loading, error } = useCollectionAssets(
      toHexString(nftAddress) as `0x${string}`,
      hookParams,
    );

    if (loading && assets.length === 0) {
      return (
        <div className="space-y-4">
          <div className="text-center h-12">
            <p className="text-muted-foreground mb-2">
              Discovering collection assets...
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500 mb-2">Error loading collection assets</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      );
    }

    if (assets.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No assets found for this collection.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Collection NFT ID: {idParam}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Total Supply: {totalSupply || "Unknown"}
          </p>
        </div>
      );
    }

    const filteredAssets = assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Assets</h3>
            <p className="text-muted-foreground">
              {filteredAssets.length} of {assets.length} assets
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAssets.map((asset) => (
              <NFTCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              {searchQuery
                ? "No assets found matching your search."
                : "No assets in this collection yet."}
            </div>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);

CollectionNFTs.displayName = "CollectionNFTs";
